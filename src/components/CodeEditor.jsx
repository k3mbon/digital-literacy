import React, { useState, useRef, useEffect } from 'react';

const CodeEditor = ({ code = '', onChange, onRun, onStop, isRunning, language = 'arduino' }) => {
  const [lineNumbers, setLineNumbers] = useState([]);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const [isModified, setIsModified] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [errors, setErrors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Arduino code templates
  const templates = {
    blink: `void setup() {
  // Initialize digital pin LED_BUILTIN as an output
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // Turn the LED on
  delay(1000);                       // Wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // Turn the LED off
  delay(1000);                       // Wait for a second
}`,
    
    serial: `void setup() {
  // Initialize serial communication at 9600 bits per second
  Serial.begin(9600);
}

void loop() {
  // Print "Hello World" to the Serial Monitor
  Serial.println("Hello World!");
  delay(1000);  // Wait for a second
}`,
    
    button: `const int buttonPin = 2;     // The number of the pushbutton pin
const int ledPin = 13;        // The number of the LED pin

int buttonState = 0;          // Variable for reading the pushbutton status

void setup() {
  // Initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // Initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
}

void loop() {
  // Read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);
  
  // Check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // Turn LED on:
    digitalWrite(ledPin, HIGH);
  } else {
    // Turn LED off:
    digitalWrite(ledPin, LOW);
  }
}`,
    
    sensor: `const int sensorPin = A0;    // Analog input pin
const int ledPin = 13;       // LED pin

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  
  // Print the sensor value to Serial Monitor
  Serial.print("Sensor Value: ");
  Serial.println(sensorValue);
  
  // Control LED based on sensor value
  if (sensorValue > 512) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
  
  delay(100);
}`
  };

  // Arduino keywords for syntax highlighting
  const arduinoKeywords = {
    keywords: ['void', 'int', 'float', 'char', 'boolean', 'byte', 'long', 'short', 'double', 'string', 'String', 'const', 'static', 'volatile', 'unsigned', 'signed', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'true', 'false', 'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP'],
    functions: ['setup', 'loop', 'pinMode', 'digitalWrite', 'digitalRead', 'analogRead', 'analogWrite', 'delay', 'delayMicroseconds', 'Serial.begin', 'Serial.print', 'Serial.println', 'Serial.read', 'Serial.available', 'map', 'constrain', 'min', 'max', 'abs', 'sqrt', 'pow', 'sin', 'cos', 'tan'],
    constants: ['LED_BUILTIN', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5']
  };

  // Update line numbers when code changes
  useEffect(() => {
    if (code && typeof code === 'string') {
      const lines = code.split('\n');
      setLineNumbers(lines.map((_, index) => index + 1));
      setIsModified(true);
    } else {
      setLineNumbers([1]);
      setIsModified(false);
    }
  }, [code]);

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

  // Simple syntax validation
  const validateCode = (codeText) => {
    const newErrors = [];
    if (!codeText || typeof codeText !== 'string') {
      return newErrors;
    }
    const lines = codeText.split('\n');
    
    lines.forEach((line, index) => {
      if (!line || typeof line !== 'string') return;
      
      // Check for common syntax errors
      if (line.includes('setup(') && !line.includes('void setup()')) {
        newErrors.push({ line: index + 1, message: 'setup() should be declared as void setup()' });
      }
      if (line.includes('loop(') && !line.includes('void loop()')) {
        newErrors.push({ line: index + 1, message: 'loop() should be declared as void loop()' });
      }
      // Check for missing semicolons (basic check)
      if (line.trim() && !line.trim().endsWith(';') && !line.trim().endsWith('{') && !line.trim().endsWith('}') && !line.includes('//') && !line.includes('void') && !line.includes('#')) {
        if (line.includes('digitalWrite') || line.includes('pinMode') || line.includes('delay') || line.includes('Serial.')) {
          newErrors.push({ line: index + 1, message: 'Missing semicolon' });
        }
      }
    });
    
    setErrors(newErrors);
  };

  // Debounced validation
  useEffect(() => {
    const timer = setTimeout(() => {
      validateCode(code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code]);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Load template
  const loadTemplate = (templateName) => {
    onChange(templates[templateName]);
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-tabs">
          <div className="editor-tab active">
            <span className="tab-icon">📄</span>
            <span className="tab-name">sketch.ino</span>
            {isModified && <span className="modified-indicator">●</span>}
          </div>
        </div>
        
        <div className="editor-actions">
          <div className="editor-controls">
            <button className="editor-btn" title="New File">
              <span>📄</span>
            </button>
            <button className="editor-btn" title="Open File">
              <span>📁</span>
            </button>
            <button className="editor-btn" title="Save" disabled={!isModified}>
              <span>💾</span>
            </button>
            <div className="separator"></div>
            <button className="editor-btn" title="Undo">
              <span>↶</span>
            </button>
            <button className="editor-btn" title="Redo">
              <span>↷</span>
            </button>
            <div className="separator"></div>
            <button className="editor-btn" title="Find">
              <span>🔍</span>
            </button>
            <button className="editor-btn" title="Replace">
              <span>🔄</span>
            </button>
          </div>
          
          <div className="template-selector">
            <select onChange={(e) => e.target.value && loadTemplate(e.target.value)} defaultValue="">
              <option value="">📋 Templates</option>
              <option value="blink">💡 Blink LED</option>
              <option value="serial">📡 Serial Communication</option>
              <option value="button">🔘 Button Control</option>
              <option value="sensor">📊 Sensor Reading</option>
            </select>
          </div>
          
          <div className="run-controls">
            <button 
              className={`run-btn ${isRunning ? 'running' : ''} ${errors.length > 0 ? 'has-errors' : ''}`}
              onClick={isRunning ? onStop : onRun}
              disabled={!code || !code.trim()}
              title={errors.length > 0 ? `${errors.length} error(s) found` : ''}
            >
              {isRunning ? (
                <>
                  <span className="stop-icon">⏹</span>
                  Stop
                </>
              ) : (
                <>
                  <span className="play-icon">▶</span>
                  Run
                </>
              )}
            </button>
            
            <button 
              className={`verify-btn ${errors.length === 0 && code && code.trim() ? 'success' : ''}`} 
              title={`Verify Code (${errors.length} errors)`}
              onClick={() => validateCode(code)}
            >
              <span className="verify-icon">{errors.length === 0 && code && code.trim() ? '✅' : '🔍'}</span>
              Verify
            </button>
            
            <button className="upload-btn" title="Upload to Board" disabled={errors.length > 0}>
              <span className="upload-icon">📤</span>
              Upload
            </button>
          </div>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="error-panel">
          <div className="error-header">
            <span className="error-icon">⚠️</span>
            <span className="error-count">{errors.length} error(s) found</span>
          </div>
          <div className="error-list">
            {errors.map((error, index) => (
              <div key={index} className="error-item" onClick={() => {
                // Jump to error line
                if (textareaRef.current) {
                  const lines = code.split('\n');
                  const position = lines.slice(0, error.line - 1).join('\n').length + (error.line > 1 ? 1 : 0);
                  textareaRef.current.focus();
                  textareaRef.current.setSelectionRange(position, position + lines[error.line - 1]?.length || 0);
                }
              }}>
                <span className="error-line">Line {error.line}:</span>
                <span className="error-message">{error.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="editor-body">
        <div className="editor-container">
          {/* Line Numbers */}
          <div 
            className="line-numbers" 
            ref={lineNumbersRef}
            onScroll={handleScroll}
          >
            {lineNumbers.map(num => (
              <div key={num} className="line-number">{num}</div>
            ))}
          </div>
          
          {/* Code Input */}
          <textarea
            ref={textareaRef}
            className="code-input"
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPosition();
            }}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onMouseUp={updateCursorPosition}
            onKeyUp={updateCursorPosition}
            placeholder="// Write your Arduino code here...\n\nvoid setup() {\n  // Put your setup code here, to run once:\n\n}\n\nvoid loop() {\n  // Put your main code here, to run repeatedly:\n\n}"
            spellCheck={false}
            style={{ fontSize: `${fontSize}px` }}
          />
        </div>
      </div>
      
      <div className="editor-footer">
        <div className="editor-status">
          <span className="status-item cursor-position">
            Ln {currentLine}, Col {currentColumn}
          </span>
          <span className="status-item">
            {errors.length > 0 ? (
              <span className="status-errors">
                <span className="error-indicator">⚠️</span>
                {errors.length} error{errors.length !== 1 ? 's' : ''}
              </span>
            ) : (
              <span className="status-ok">
                <span className="ok-indicator">✅</span>
                No errors
              </span>
            )}
          </span>
          <span className="status-item">
            Lines: {lineNumbers.length}
          </span>
          <span className="status-item">
            Size: {(code.length / 1024).toFixed(1)} KB
          </span>
          <span className="status-item">
            {isRunning ? (
              <span className="status-running">
                <span className="pulse-dot"></span>
                Running
              </span>
            ) : (
              <span className="status-idle">
                <span className="idle-indicator">⏸️</span>
                Ready
              </span>
            )}
          </span>
        </div>
        
        <div className="editor-controls-right">
          <div className="font-controls">
            <button 
              className="font-btn" 
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              title="Decrease font size"
            >
              A-
            </button>
            <span className="font-size">{fontSize}px</span>
            <button 
              className="font-btn" 
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              title="Increase font size"
            >
              A+
            </button>
          </div>
          
          <div className="language-info">
            <span className="language-badge">{language.toUpperCase()}</span>
          </div>
          
          <div className="editor-info">
            <span className="info-item" title="Tab key for indentation">Tab: Indent</span>
            <span className="info-item" title="Ctrl+Enter to run code">Ctrl+↵: Run</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;