import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Square, RotateCcw, CheckCircle, XCircle, Terminal, Code, Lightbulb } from 'lucide-react';
import '../styles/CodeEditor.css';
import { loader } from '@monaco-editor/react';

// Error Boundary Component for Monaco Editor
class EditorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Monaco Editor Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="editor-error-fallback">
          <div className="error-message">
            <h4>Editor Loading Error</h4>
            <p>The code editor failed to load. Please refresh the page to try again.</p>
            <button 
              className="editor-btn primary" 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Configure Monaco Editor loader to avoid CDN issues
loader.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@0.52.2/min/vs'
  },
  'vs/nls': {
    availableLanguages: {
      '*': 'en'
    }
  }
});

// Disable problematic Monaco features that cause loading issues
loader.init().then((monaco) => {
  // Disable features that require external dependencies
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    noLib: true,
    allowNonTsExtensions: true
  });
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    noLib: true,
    allowNonTsExtensions: true
  });
}).catch((error) => {
  console.warn('Monaco Editor initialization warning:', error);
});

// Python execution using Pyodide
let pyodideInstance = null;

const initializePyodide = async () => {
  if (!pyodideInstance) {
    try {
      const { loadPyodide } = await import('pyodide');
      pyodideInstance = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/'
      });
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
      throw new Error('Python environment initialization failed');
    }
  }
  return pyodideInstance;
};

// JavaScript execution in safe environment
const executeJavaScript = (code, inputs = []) => {
  try {
    // Create a safe execution context
    const safeGlobals = {
      console: {
        log: (...args) => args.join(' '),
        error: (...args) => `Error: ${args.join(' ')}`,
        warn: (...args) => `Warning: ${args.join(' ')}`
      },
      Math,
      Date,
      JSON,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      // Mock input function for testing
      input: (prompt = '') => {
        if (inputs.length > 0) {
          return inputs.shift();
        }
        return prompt ? `Mock input for: ${prompt}` : 'mock_input';
      },
      // Mock print function
      print: (...args) => args.join(' ')
    };

    // Create function with limited scope
    const func = new Function(
      ...Object.keys(safeGlobals),
      `
        let output = [];
        const originalLog = console.log;
        console.log = (...args) => {
          output.push(args.join(' '));
          return originalLog(...args);
        };
        
        try {
          ${code}
          return { success: true, output: output.join('\\n'), error: null };
        } catch (error) {
          return { success: false, output: output.join('\\n'), error: error.message };
        }
      `
    );

    return func(...Object.values(safeGlobals));
  } catch (error) {
    return { success: false, output: '', error: error.message };
  }
};

// Python execution wrapper
const executePython = async (code, inputs = []) => {
  try {
    const pyodide = await initializePyodide();
    
    // Mock input function for Python
    pyodide.globals.set('mock_inputs', inputs);
    pyodide.runPython(`
      import sys
      import builtins
      from io import StringIO
      
      # Capture output
      old_stdout = sys.stdout
      sys.stdout = captured_output = StringIO()
      
      # Mock input function
      input_index = 0
      def mock_input(prompt=''):
          global input_index
          if input_index < len(mock_inputs):
              result = mock_inputs[input_index]
              input_index += 1
              return str(result)
          return 'mock_input'
      
      # Override built-in input safely
      builtins.input = mock_input
    `);
    
    // Execute user code
    pyodide.runPython(code);
    
    // Get output
    const output = pyodide.runPython(`
      sys.stdout = old_stdout
      captured_output.getvalue()
    `);
    
    return { success: true, output, error: null };
  } catch (error) {
    return { success: false, output: '', error: error.message };
  }
};

const CodeEditor = ({ 
  initialCode = '', 
  language = 'python', 
  expectedOutput = null,
  testCases = [],
  hints = [],
  onComplete = null,
  title = 'Code Editor',
  description = '',
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      theme: 'vs-dark',
      wordWrap: 'on',
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 3
    });
    
    // Set up error handling for Monaco
    monaco.editor.onDidCreateModel((model) => {
      model.onDidChangeContent(() => {
        // Clear any previous error markers
        monaco.editor.setModelMarkers(model, 'owner', []);
      });
    });
  };
  
  const handleEditorWillMount = (monaco) => {
    // Configure Monaco before mounting to prevent loading errors
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  };

  const runCode = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setOutput('');
    setTestResults([]);
    
    try {
      let result;
      if (language === 'python') {
        result = await executePython(code);
      } else {
        result = executeJavaScript(code);
      }
      
      if (result.success) {
        setOutput(result.output || 'Code executed successfully (no output)');
        
        // Run test cases if provided
        if (testCases.length > 0) {
          await runTestCases();
        } else if (expectedOutput) {
          // Simple output comparison
          const isMatch = result.output.trim() === expectedOutput.trim();
          setIsCorrect(isMatch);
          if (isMatch && onComplete) {
            setTimeout(() => onComplete(), 1500);
          }
        }
      } else {
        setOutput(`Error: ${result.error}`);
      }
    } catch (error) {
      setOutput(`Execution Error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  const runTestCases = async () => {
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      try {
        let result;
        if (language === 'python') {
          result = await executePython(code, testCase.inputs || []);
        } else {
          result = executeJavaScript(code, testCase.inputs || []);
        }
        
        const passed = result.success && 
          (testCase.expectedOutput ? 
            result.output.trim() === testCase.expectedOutput.trim() : 
            true);
        
        results.push({
          name: testCase.name || `Test ${i + 1}`,
          passed,
          expected: testCase.expectedOutput,
          actual: result.output,
          error: result.error
        });
      } catch (error) {
        results.push({
          name: testCase.name || `Test ${i + 1}`,
          passed: false,
          expected: testCase.expectedOutput,
          actual: '',
          error: error.message
        });
      }
    }
    
    setTestResults(results);
    const allPassed = results.every(r => r.passed);
    setIsCorrect(allPassed);
    
    if (allPassed && onComplete) {
      setTimeout(() => onComplete(), 1500);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setTestResults([]);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHint(0);
  };

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const prevHint = () => {
    if (currentHint > 0) {
      setCurrentHint(currentHint - 1);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <div className="editor-title">
          <Code size={20} />
          <h3>{title}</h3>
        </div>
        <div className="editor-controls">
          <button 
            className="editor-btn secondary" 
            onClick={() => setShowHints(!showHints)}
            disabled={hints.length === 0}
          >
            <Lightbulb size={16} />
            Hints ({hints.length})
          </button>
          <button className="editor-btn secondary" onClick={resetCode}>
            <RotateCcw size={16} />
            Reset
          </button>
          <button 
            className={`editor-btn primary ${isRunning ? 'running' : ''}`}
            onClick={runCode}
            disabled={isRunning || readOnly}
          >
            {isRunning ? (
              <>
                <Square size={16} />
                Running...
              </>
            ) : (
              <>
                <Play size={16} />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {description && (
        <div className="editor-description">
          <p>{description}</p>
        </div>
      )}

      <div className="editor-workspace">
        <div className="editor-panel">
          <div className="editor-wrapper">
            <EditorErrorBoundary>
              <Editor
                height="400px"
                language={language === 'python' ? 'python' : 'javascript'}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                loading={<div className="editor-loading">Loading editor...</div>}
                onValidate={(markers) => {
                  // Handle validation errors silently
                  if (markers && markers.length > 0) {
                    console.debug('Editor validation markers:', markers);
                  }
                }}
                options={{
                  readOnly,
                  theme: 'vs-dark',
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  glyphMargin: false,
                  folding: false,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 3,
                  contextmenu: false,
                  quickSuggestions: false,
                  suggestOnTriggerCharacters: false,
                  acceptSuggestionOnEnter: 'off',
                  tabCompletion: 'off',
                  wordBasedSuggestions: false,
                  parameterHints: { enabled: false },
                  hover: { enabled: false },
                  // Disable features that might cause loading issues
                  codeLens: false,
                  colorDecorators: false,
                  links: false,
                  find: {
                    seedSearchStringFromSelection: false,
                    autoFindInSelection: 'never'
                  }
                }}
              />
            </EditorErrorBoundary>
          </div>
        </div>

        <div className="output-panel">
          <div className="panel-header">
            <Terminal size={16} />
            <span>Output</span>
            {isCorrect && (
              <div className="success-indicator">
                <CheckCircle size={16} />
                Correct!
              </div>
            )}
          </div>
          
          <div className="output-content">
            {output && (
              <pre className="output-text">{output}</pre>
            )}
            
            {testResults.length > 0 && (
              <div className="test-results">
                <h4>Test Results:</h4>
                {testResults.map((result, index) => (
                  <div key={index} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                    <div className="test-header">
                      {result.passed ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      <span>{result.name}</span>
                    </div>
                    {!result.passed && (
                      <div className="test-details">
                        {result.expected && (
                          <div>
                            <strong>Expected:</strong> {result.expected}
                          </div>
                        )}
                        <div>
                          <strong>Got:</strong> {result.actual || 'No output'}
                        </div>
                        {result.error && (
                          <div className="error-message">
                            <strong>Error:</strong> {result.error}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showHints && hints.length > 0 && (
        <div className="hints-panel">
          <div className="hints-header">
            <Lightbulb size={16} />
            <span>Hint {currentHint + 1} of {hints.length}</span>
            <div className="hints-navigation">
              <button 
                onClick={prevHint} 
                disabled={currentHint === 0}
                className="hint-nav-btn"
              >
                ←
              </button>
              <button 
                onClick={nextHint} 
                disabled={currentHint === hints.length - 1}
                className="hint-nav-btn"
              >
                →
              </button>
            </div>
          </div>
          <div className="hint-content">
            <p>{hints[currentHint]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;