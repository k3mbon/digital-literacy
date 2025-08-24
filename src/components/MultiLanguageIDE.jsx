import React, { useState, useRef, useEffect } from 'react';

const MultiLanguageIDE = ({ initialCode = '', initialLanguage = 'javascript', onCodeChange }) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [lineNumbers, setLineNumbers] = useState([1]);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  // Language configurations
  const languages = {
    javascript: {
      name: 'JavaScript',
      template: `// JavaScript Hello World\nconsole.log("Hello, World!");\n\n// Try some basic operations\nlet name = "Student";\nconsole.log("Hello, " + name + "!");\n\n// Simple function\nfunction greet(person) {\n  return "Welcome, " + person + "!";\n}\n\nconsole.log(greet("Learner"));`,
      keywords: ['function', 'let', 'const', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'async', 'await', 'try', 'catch'],
      builtins: ['console', 'document', 'window', 'Array', 'Object', 'String', 'Number', 'Boolean']
    },
    python: {
      name: 'Python',
      template: `# Python Hello World\nprint("Hello, World!")\n\n# Try some basic operations\nname = "Student"\nprint(f"Hello, {name}!")\n\n# Simple function\ndef greet(person):\n    return f"Welcome, {person}!"\n\nprint(greet("Learner"))\n\n# List example\nnumbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    print(f"Number: {num}")`,
      keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'with', 'lambda', 'and', 'or', 'not'],
      builtins: ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple']
    },
    java: {
      name: 'Java',
      template: `// Java Hello World\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n        \n        // Try some basic operations\n        String name = \"Student\";\n        System.out.println(\"Hello, \" + name + \"!\");\n        \n        // Simple method call\n        String greeting = greet(\"Learner\");\n        System.out.println(greeting);\n    }\n    \n    public static String greet(String person) {\n        return \"Welcome, \" + person + \"!\";\n    }\n}`,
      keywords: ['public', 'private', 'protected', 'static', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'return', 'try', 'catch', 'finally'],
      builtins: ['System', 'String', 'Integer', 'Double', 'Boolean', 'ArrayList', 'HashMap']
    },
    cpp: {
      name: 'C++',
      template: `// C++ Hello World\n#include <iostream>\n#include <string>\n\nusing namespace std;\n\nstring greet(string person) {\n    return \"Welcome, \" + person + \"!\";\n}\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    \n    // Try some basic operations\n    string name = \"Student\";\n    cout << \"Hello, \" << name << \"!\" << endl;\n    \n    // Simple function call\n    cout << greet(\"Learner\") << endl;\n    \n    return 0;\n}`,
      keywords: ['include', 'using', 'namespace', 'int', 'float', 'double', 'char', 'string', 'bool', 'if', 'else', 'for', 'while', 'return', 'class', 'public', 'private', 'protected'],
      builtins: ['cout', 'cin', 'endl', 'string', 'vector', 'map', 'set']
    },
    html: {
      name: 'HTML',
      template: `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Welcome to HTML!</p>\n    \n    <div class=\"container\">\n        <h2>Student Portal</h2>\n        <p>This is a simple HTML example.</p>\n        <button onclick=\"alert('Hello!')\">Click Me</button>\n    </div>\n</body>\n</html>`,
      keywords: ['html', 'head', 'body', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th'],
      builtins: ['DOCTYPE', 'meta', 'title', 'link', 'script', 'style']
    }
  };

  // Update line numbers when code changes
  useEffect(() => {
    if (code && typeof code === 'string') {
      const lines = code.split('\n');
      setLineNumbers(lines.map((_, index) => index + 1));
    } else {
      setLineNumbers([1]);
    }
  }, [code]);

  // Handle code change
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode, language);
    }
    updateCursorPosition();
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languages[newLanguage].template);
    setOutput('');
    if (onCodeChange) {
      onCodeChange(languages[newLanguage].template, newLanguage);
    }
  };

  // Track cursor position
  const updateCursorPosition = () => {
    if (textareaRef.current && code && typeof code === 'string') {
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = code.substring(0, cursorPos);
      const lines = textBeforeCursor.split('\n');
      setCurrentLine(lines.length);
      setCurrentColumn(lines[lines.length - 1].length + 1);
    }
  };

  // Handle key press for auto-completion
  const handleKeyDown = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    // Auto-completion for brackets and quotes
    const pairs = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    if (pairs[e.key]) {
      e.preventDefault();
      const newValue = value.substring(0, start) + e.key + pairs[e.key] + value.substring(end);
      setCode(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
      return;
    }

    // Handle Tab for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      setCode(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }

    // Handle Enter for auto-indentation
    if (e.key === 'Enter') {
      const currentLineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLineText = value.substring(currentLineStart, start);
      const indent = currentLineText.match(/^\s*/)[0];
      
      // Add extra indent for opening braces
      const extraIndent = currentLineText.trim().endsWith('{') ? '  ' : '';
      
      e.preventDefault();
      const newValue = value.substring(0, start) + '\n' + indent + extraIndent + value.substring(end);
      setCode(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length + extraIndent.length;
      }, 0);
      return;
    }
  };

  // Simulate code execution
  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      let result = '';
      
      switch (language) {
        case 'javascript':
          result = simulateJavaScript(code);
          break;
        case 'python':
          result = simulatePython(code);
          break;
        case 'java':
          result = simulateJava(code);
          break;
        case 'cpp':
          result = simulateCpp(code);
          break;
        case 'html':
          result = 'HTML code would be rendered in a browser.\nPreview: Your HTML structure is ready!';
          break;
        default:
          result = 'Language execution not implemented yet.';
      }
      
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    
    setIsRunning(false);
  };

  // Simple JavaScript simulation
  const simulateJavaScript = (code) => {
    let output = '';
    const originalLog = console.log;
    
    // Mock console.log
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };
    
    try {
      // Simple evaluation for basic JavaScript
      if (code.includes('console.log')) {
        const lines = code.split('\n');
        lines.forEach(line => {
          if (line.trim().startsWith('console.log')) {
            const match = line.match(/console\.log\((.+)\)/);
            if (match) {
              let content = match[1].trim();
              // Handle simple string literals
              if (content.startsWith('"') && content.endsWith('"')) {
                output += content.slice(1, -1) + '\n';
              } else if (content.startsWith("'") && content.endsWith("'")) {
                output += content.slice(1, -1) + '\n';
              } else if (content.startsWith('`') && content.endsWith('`')) {
                // Simple template literal handling
                content = content.slice(1, -1);
                if (content.includes('${')) {
                  output += content.replace(/\$\{[^}]+\}/g, '[variable]') + '\n';
                } else {
                  output += content + '\n';
                }
              } else {
                output += '[expression result]\n';
              }
            }
          }
        });
      } else {
        output = 'Code executed successfully (no console output)';
      }
    } catch (error) {
      output = `JavaScript Error: ${error.message}`;
    }
    
    console.log = originalLog;
    return output || 'No output generated';
  };

  // Simple Python simulation
  const simulatePython = (code) => {
    let output = '';
    const lines = code.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('print(')) {
        const match = trimmed.match(/print\((.+)\)/);
        if (match) {
          let content = match[1].trim();
          if (content.startsWith('"') && content.endsWith('"')) {
            output += content.slice(1, -1) + '\n';
          } else if (content.startsWith("'") && content.endsWith("'")) {
            output += content.slice(1, -1) + '\n';
          } else if (content.startsWith('f"') || content.startsWith("f'")) {
            // Simple f-string handling
            content = content.slice(2, -1);
            output += content.replace(/\{[^}]+\}/g, '[variable]') + '\n';
          } else {
            output += '[expression result]\n';
          }
        }
      }
    });
    
    return output || 'Python code executed successfully (no print output)';
  };

  // Simple Java simulation
  const simulateJava = (code) => {
    let output = '';
    const lines = code.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes('System.out.println(')) {
        const match = trimmed.match(/System\.out\.println\((.+)\)/);
        if (match) {
          let content = match[1].trim();
          if (content.startsWith('"') && content.endsWith('"')) {
            output += content.slice(1, -1) + '\n';
          } else {
            output += '[expression result]\n';
          }
        }
      }
    });
    
    return output || 'Java code compiled and executed successfully (no output)';
  };

  // Simple C++ simulation
  const simulateCpp = (code) => {
    let output = '';
    const lines = code.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.includes('cout <<')) {
        const parts = trimmed.split('cout <<')[1];
        if (parts) {
          const content = parts.split('<<')[0].trim();
          if (content.startsWith('"') && content.endsWith('"')) {
            output += content.slice(1, -1) + '\n';
          } else {
            output += '[expression result]\n';
          }
        }
      }
    });
    
    return output || 'C++ code compiled and executed successfully (no output)';
  };

  // Apply syntax highlighting
  const applySyntaxHighlighting = (text) => {
    if (!text || !languages[language]) return text;
    
    const { keywords, builtins } = languages[language];
    let highlighted = text;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    
    // Highlight built-ins
    builtins.forEach(builtin => {
      const regex = new RegExp(`\\b${builtin}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="builtin">${builtin}</span>`);
    });
    
    // Highlight strings
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="string">$1</span>');
    
    // Highlight comments
    if (language === 'python') {
      highlighted = highlighted.replace(/#(.*)$/gm, '<span class="comment">#$1</span>');
    } else {
      highlighted = highlighted.replace(/\/\/(.*)$/gm, '<span class="comment">//$1</span>');
    }
    
    return highlighted;
  };

  return (
    <div className="multi-language-ide">
      <div className="ide-header">
        <div className="language-selector">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-select"
          >
            {Object.entries(languages).map(([key, lang]) => (
              <option key={key} value={key}>{lang.name}</option>
            ))}
          </select>
        </div>
        
        <div className="ide-controls">
          <button 
            className={`run-btn ${isRunning ? 'running' : ''}`}
            onClick={runCode}
            disabled={isRunning || !code.trim()}
          >
            {isRunning ? (
              <>
                <span className="spinner">⟳</span>
                Running...
              </>
            ) : (
              <>
                <span className="play-icon">▶</span>
                Run Code
              </>
            )}
          </button>
          
          <button 
            className="clear-btn"
            onClick={() => {
              setCode(languages[language].template);
              setOutput('');
            }}
          >
            <span className="clear-icon">🗑</span>
            Reset
          </button>
        </div>
      </div>
      
      <div className="ide-body">
        <div className="editor-section">
          <div className="editor-container">
            <div className="line-numbers">
              {lineNumbers.map(num => (
                <div key={num} className="line-number">{num}</div>
              ))}
            </div>
            
            <textarea
              ref={textareaRef}
              className="code-editor"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onMouseUp={updateCursorPosition}
              onKeyUp={updateCursorPosition}
              placeholder={`Write your ${languages[language].name} code here...`}
              spellCheck={false}
            />
          </div>
          
          <div className="editor-footer">
            <span className="cursor-position">
              Ln {currentLine}, Col {currentColumn}
            </span>
            <span className="language-indicator">
              {languages[language].name}
            </span>
          </div>
        </div>
        
        <div className="output-section">
          <div className="output-header">
            <h3>Output</h3>
            <button 
              className="clear-output-btn"
              onClick={() => setOutput('')}
              disabled={!output}
            >
              Clear
            </button>
          </div>
          
          <div 
            ref={outputRef}
            className="output-terminal"
          >
            <pre>{output || 'No output yet. Run your code to see results here.'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageIDE;