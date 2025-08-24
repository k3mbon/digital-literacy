import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './ProfessionalIDE.css';

const ProfessionalIDE = ({ onBack }) => {
  const [activePanel, setActivePanel] = useState('explorer');
  const [openFiles, setOpenFiles] = useState([{ name: 'main.js', content: '// Welcome to Professional IDE\nconsole.log("Hello, World!");\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));', language: 'javascript', active: true }]);
  const [activeFile, setActiveFile] = useState('main.js');
  const [terminalOutput, setTerminalOutput] = useState(['Welcome to Professional IDE Terminal', '$ ']);
  const [terminalInput, setTerminalInput] = useState('');
  const [problems, setProblems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [fileTree, setFileTree] = useState({
    'src': {
      type: 'folder',
      expanded: true,
      children: {
        'main.js': { type: 'file', language: 'javascript' },
        'utils.js': { type: 'file', language: 'javascript' },
        'components': {
          type: 'folder',
          expanded: false,
          children: {
            'Header.jsx': { type: 'file', language: 'javascript' },
            'Footer.jsx': { type: 'file', language: 'javascript' }
          }
        }
      }
    },
    'package.json': { type: 'file', language: 'json' },
    'README.md': { type: 'file', language: 'markdown' }
  });
  const [newFileName, setNewFileName] = useState('');
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  
  const terminalRef = useRef(null);
  const editorRef = useRef(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+N for new file
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        createNewFile();
      }
      // Ctrl+S for save (simulate)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        setTerminalOutput(prev => [
          ...prev.slice(0, -1),
          `$ save ${activeFile}`,
          `File saved: ${activeFile}`,
          '$ '
        ]);
      }
      // Ctrl+Enter for run
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeFile]);
  
  const getFileContent = (fileName) => {
    const file = openFiles.find(f => f.name === fileName);
    return file ? file.content : '';
  };
  
  const updateFileContent = (fileName, content) => {
    setOpenFiles(prev => prev.map(file => 
      file.name === fileName ? { ...file, content } : file
    ));
  };
  
  const openFile = (fileName, path = '') => {
    const fullPath = path ? `${path}/${fileName}` : fileName;
    const existingFile = openFiles.find(f => f.name === fullPath);
    
    if (!existingFile) {
      const newFile = {
        name: fullPath,
        content: getDefaultContent(fileName),
        language: getLanguageFromExtension(fileName),
        active: true
      };
      
      setOpenFiles(prev => [...prev.map(f => ({ ...f, active: false })), newFile]);
    }
    
    setActiveFile(fullPath);
    setOpenFiles(prev => prev.map(f => ({ ...f, active: f.name === fullPath })));
  };
  
  const closeFile = (fileName) => {
    setOpenFiles(prev => {
      const filtered = prev.filter(f => f.name !== fileName);
      if (fileName === activeFile && filtered.length > 0) {
        setActiveFile(filtered[0].name);
        filtered[0].active = true;
      }
      return filtered;
    });
  };

  const createNewFile = () => {
    setShowNewFileInput(true);
    setNewFileName('');
  };

  const handleNewFileSubmit = (e) => {
    e.preventDefault();
    if (newFileName.trim()) {
      const fileName = newFileName.trim();
      
      // Check if file already exists
      if (fileTree[fileName] || Object.values(fileTree).some(item => 
        item.type === 'folder' && item.children && item.children[fileName]
      )) {
        alert('File already exists!');
        return;
      }
      
      // Add to file tree
      setFileTree(prev => ({
        ...prev,
        [fileName]: { type: 'file', language: getLanguageFromExtension(fileName) }
      }));
      
      // Open the new file
      const newFile = {
        name: fileName,
        content: getDefaultContent(fileName),
        language: getLanguageFromExtension(fileName),
        active: true
      };
      
      setOpenFiles(prev => [...prev.map(f => ({ ...f, active: false })), newFile]);
      setActiveFile(fileName);
      
      // Reset input state
      setShowNewFileInput(false);
      setNewFileName('');
      
      // Add success message to terminal
      setTerminalOutput(prev => [
        ...prev.slice(0, -1),
        `$ touch ${fileName}`,
        `Created new file: ${fileName}`,
        '$ '
      ]);
    }
  };

  const handleNewFileCancel = () => {
    setShowNewFileInput(false);
    setNewFileName('');
  };

  const deleteFile = (fileName) => {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      // Remove from file tree
      setFileTree(prev => {
        const newTree = { ...prev };
        delete newTree[fileName];
        return newTree;
      });
      
      // Close file if it's open
      closeFile(fileName);
      
      // Add message to terminal
      setTerminalOutput(prev => [
        ...prev.slice(0, -1),
        `$ rm ${fileName}`,
        `Deleted file: ${fileName}`,
        '$ '
      ]);
    }
    setContextMenu(null);
  };

  const handleFileRightClick = (e, fileName) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      fileName
    });
  };

  const handleClickOutside = () => {
    setContextMenu(null);
  };
  
  const getDefaultContent = (fileName) => {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'js':
        return `// ${fileName}\nconsole.log('Hello from ${fileName}');`;
      case 'jsx':
        return `import React from 'react';\n\nconst ${fileName.replace('.jsx', '')} = () => {\n  return (\n    <div>\n      <h1>${fileName.replace('.jsx', '')} Component</h1>\n    </div>\n  );\n};\n\nexport default ${fileName.replace('.jsx', '')};`;
      case 'json':
        return '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "main": "index.js"\n}';
      case 'md':
        return `# ${fileName.replace('.md', '')}\n\nThis is a markdown file.`;
      default:
        return `// ${fileName}\n`;
    }
  };
  
  const getLanguageFromExtension = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const languageMap = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'cpp': 'cpp',
      'c': 'c',
      'java': 'java',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'sh': 'shell',
      'sql': 'sql',
      'xml': 'xml',
      'yaml': 'yaml',
      'yml': 'yaml',
      'ino': 'cpp' // Arduino files
    };
    return languageMap[ext] || 'plaintext';
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      theme: 'vs-dark',
      minimap: { enabled: true },
      wordWrap: 'on',
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      parameterHints: { enabled: true },
      quickSuggestions: true,
      folding: true,
      foldingStrategy: 'indentation',
      showFoldingControls: 'always',
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true
      }
    });

    // Add custom key bindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      setTerminalOutput(prev => [
        ...prev.slice(0, -1),
        `$ save ${activeFile}`,
        `File saved: ${activeFile}`,
        '$ '
      ]);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });

    // Add code formatting command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument').run();
    });

    // Add find command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      editor.getAction('actions.find').run();
    });

    // Add find and replace command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
      editor.getAction('editor.action.startFindReplaceAction').run();
    });

    // Add go to line command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => {
      editor.getAction('editor.action.gotoLine').run();
    });

    // Add comment toggle command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
      editor.getAction('editor.action.commentLine').run();
    });

    // Add Arduino-specific snippets and completions
    monaco.languages.registerCompletionItemProvider('cpp', {
      provideCompletionItems: (model, position) => {
        const suggestions = [
          {
            label: 'setup',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'void setup() {\n  $0\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Arduino setup function'
          },
          {
            label: 'loop',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'void loop() {\n  $0\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Arduino loop function'
          },
          {
            label: 'digitalWrite',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'digitalWrite(${1:pin}, ${2:value});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Write a HIGH or LOW value to a digital pin'
          },
          {
            label: 'digitalRead',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'digitalRead(${1:pin})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Read the value from a specified digital pin'
          },
          {
            label: 'analogRead',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'analogRead(${1:pin})',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Read the value from the specified analog pin'
          },
          {
            label: 'analogWrite',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'analogWrite(${1:pin}, ${2:value});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Write an analog value (PWM wave) to a pin'
          },
          {
            label: 'pinMode',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'pinMode(${1:pin}, ${2:mode});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Configure the specified pin to behave either as an input or an output'
          },
          {
            label: 'delay',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'delay(${1:milliseconds});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Pause the program for the amount of time (in milliseconds)'
          },
          {
            label: 'Serial.begin',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Serial.begin(${1:9600});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Initialize serial communication'
          },
          {
            label: 'Serial.println',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'Serial.println(${1:"Hello World"});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Print data to the serial port followed by a newline'
          }
        ];
        return { suggestions };
      }
    });
  };

  const handleEditorChange = (value) => {
    if (activeFile) {
      updateFileContent(activeFile, value || '');
    }
  };
  
  const runCode = () => {
    setIsRunning(true);
    const currentFile = openFiles.find(f => f.name === activeFile);
    
    if (currentFile && currentFile.language === 'javascript') {
      try {
        // Simple JavaScript execution simulation
        const output = [];
        const originalLog = console.log;
        console.log = (...args) => output.push(args.join(' '));
        
        // Execute the code (in a real IDE, this would be sandboxed)
        eval(currentFile.content);
        
        console.log = originalLog;
        
        setTerminalOutput(prev => [
          ...prev,
          `$ node ${currentFile.name}`,
          ...output,
          '$ '
        ]);
        
        setProblems([]);
      } catch (error) {
        setTerminalOutput(prev => [
          ...prev,
          `$ node ${currentFile.name}`,
          `Error: ${error.message}`,
          '$ '
        ]);
        
        setProblems([{
          type: 'error',
          message: error.message,
          file: currentFile.name,
          line: 1
        }]);
      }
    } else if (currentFile && currentFile.language === 'python') {
      try {
        // Simple Python execution simulation
        const output = [];
        
        // Basic Python print() function simulation
        const pythonCode = currentFile.content;
        
        // Extract print statements and execute them
        const printRegex = /print\s*\(\s*(['"])(.*?)\1\s*\)/g;
        let match;
        
        while ((match = printRegex.exec(pythonCode)) !== null) {
          output.push(match[2]); // Extract the string content
        }
        
        // If no print statements found, check for simple expressions
        if (output.length === 0) {
          // Look for simple string literals or expressions
          const lines = pythonCode.split('\n');
          lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('import')) {
              if (trimmed.includes('print')) {
                // Handle print without quotes
                const printMatch = trimmed.match(/print\s*\(\s*(.+?)\s*\)/);
                if (printMatch) {
                  let content = printMatch[1].trim();
                  // Remove quotes if present
                  if ((content.startsWith('"') && content.endsWith('"')) || 
                      (content.startsWith("'") && content.endsWith("'"))) {
                    content = content.slice(1, -1);
                  }
                  output.push(content);
                }
              }
            }
          });
        }
        
        setTerminalOutput(prev => [
          ...prev,
          `$ python ${currentFile.name}`,
          ...output,
          '$ '
        ]);
        
        setProblems([]);
      } catch (error) {
        setTerminalOutput(prev => [
          ...prev,
          `$ python ${currentFile.name}`,
          `Error: ${error.message}`,
          '$ '
        ]);
        
        setProblems([{
          type: 'error',
          message: error.message,
          file: currentFile.name,
          line: 1
        }]);
      }
    } else {
      setTerminalOutput(prev => [
        ...prev,
        `$ echo "Running ${currentFile?.name || 'unknown file'}..."`,
        `File executed successfully!`,
        '$ '
      ]);
    }
    
    setTimeout(() => setIsRunning(false), 1000);
  };
  
  const handleTerminalCommand = (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.trim();
      setTerminalOutput(prev => [
        ...prev.slice(0, -1),
        `$ ${command}`,
        executeCommand(command),
        '$ '
      ]);
      setTerminalInput('');
    }
  };
  
  const executeCommand = (command) => {
    const [cmd, ...args] = command.split(' ');
    
    switch (cmd) {
      case 'ls':
        return Object.keys(fileTree).join('  ');
      case 'pwd':
        return '/workspace';
      case 'clear':
        setTerminalOutput(['$ ']);
        return '';
      case 'help':
        return 'Available commands: ls, pwd, clear, help, node <file>, python <file>, touch <file>, rm <file>';
      case 'node':
        if (args[0]) {
          const file = openFiles.find(f => f.name === args[0]);
          if (file && file.language === 'javascript') {
            setActiveFile(args[0]);
            runCode();
            return '';
          } else if (file) {
            return `Error: ${args[0]} is not a JavaScript file`;
          }
          return `File not found: ${args[0]}`;
        }
        return 'Usage: node <filename>';
      case 'python':
        if (args[0]) {
          const file = openFiles.find(f => f.name === args[0]);
          if (file && file.language === 'python') {
            setActiveFile(args[0]);
            runCode();
            return '';
          } else if (file) {
            return `Error: ${args[0]} is not a Python file`;
          }
          return `File not found: ${args[0]}`;
        }
        return 'Usage: python <filename>';
      case 'touch':
        if (args[0]) {
          const fileName = args[0];
          if (!fileTree[fileName]) {
            setFileTree(prev => ({
              ...prev,
              [fileName]: { type: 'file', language: getLanguageFromExtension(fileName) }
            }));
            return `Created file: ${fileName}`;
          }
          return `File already exists: ${fileName}`;
        }
        return 'Usage: touch <filename>';
      case 'rm':
        if (args[0]) {
          const fileName = args[0];
          if (fileTree[fileName]) {
            setFileTree(prev => {
              const newTree = { ...prev };
              delete newTree[fileName];
              return newTree;
            });
            closeFile(fileName);
            return `Deleted file: ${fileName}`;
          }
          return `File not found: ${fileName}`;
        }
        return 'Usage: rm <filename>';
      default:
        return `Command not found: ${cmd}`;
    }
  };
  
  const renderFileTree = (tree, path = '') => {
    return Object.entries(tree).map(([name, item]) => {
      const fullPath = path ? `${path}/${name}` : name;
      
      if (item.type === 'folder') {
        return (
          <div key={fullPath} className="folder-item">
            <div 
              className="folder-header"
              onClick={() => {
                setFileTree(prev => {
                  const newTree = { ...prev };
                  const pathParts = fullPath.split('/');
                  let current = newTree;
                  
                  for (let i = 0; i < pathParts.length - 1; i++) {
                    current = current[pathParts[i]].children;
                  }
                  
                  current[pathParts[pathParts.length - 1]].expanded = !current[pathParts[pathParts.length - 1]].expanded;
                  return newTree;
                });
              }}
            >
              <span className={`folder-icon ${item.expanded ? 'expanded' : ''}`}>📁</span>
              <span className="folder-name">{name}</span>
            </div>
            {item.expanded && (
              <div className="folder-children">
                {renderFileTree(item.children, fullPath)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div 
            key={fullPath}
            className={`file-item ${activeFile === fullPath ? 'active' : ''}`}
            onClick={() => openFile(name, path)}
            onContextMenu={(e) => handleFileRightClick(e, fullPath)}
          >
            <span className="file-icon">📄</span>
            <span className="file-name">{name}</span>
          </div>
        );
      }
    });
  };
  
  return (
    <div className="professional-ide" onClick={handleClickOutside}>
      {/* Top Bar */}
      <div className="ide-header">
        <div className="header-left">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <div className="ide-title">
            <span className="ide-icon">💻</span>
            <span>Professional IDE</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="file-tabs">
            {openFiles.map(file => (
              <div 
                key={file.name}
                className={`file-tab ${file.active ? 'active' : ''}`}
                onClick={() => {
                  setActiveFile(file.name);
                  setOpenFiles(prev => prev.map(f => ({ ...f, active: f.name === file.name })));
                }}
              >
                <span className="tab-name">{file.name}</span>
                <button 
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(file.name);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className={`run-btn ${isRunning ? 'running' : ''}`}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? '⏳' : '▶️'} Run
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ide-content">
        {/* Sidebar */}
        <div className="ide-sidebar">
          <div className="sidebar-tabs">
            <button 
              className={`sidebar-tab ${activePanel === 'explorer' ? 'active' : ''}`}
              onClick={() => setActivePanel('explorer')}
              title="Explorer"
            >
              📁
            </button>
            <button 
              className={`sidebar-tab ${activePanel === 'search' ? 'active' : ''}`}
              onClick={() => setActivePanel('search')}
              title="Search"
            >
              🔍
            </button>
            <button 
              className={`sidebar-tab ${activePanel === 'git' ? 'active' : ''}`}
              onClick={() => setActivePanel('git')}
              title="Source Control"
            >
              🌿
            </button>
          </div>
          
          <div className="sidebar-content">
            {activePanel === 'explorer' && (
              <div className="explorer-panel">
                <div className="panel-header">
                  <h3>Explorer</h3>
                  <button className="new-file-btn" title="New File" onClick={createNewFile}>+</button>
                </div>
                {showNewFileInput && (
                  <div className="new-file-input-container">
                    <form onSubmit={handleNewFileSubmit}>
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="Enter file name (e.g., app.js)"
                        className="new-file-input"
                        autoFocus
                        onBlur={(e) => {
                          // Only cancel if clicking outside, not on form submit
                          setTimeout(() => {
                            if (!e.relatedTarget || !e.relatedTarget.closest('.new-file-input-container')) {
                              handleNewFileCancel();
                            }
                          }, 100);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            handleNewFileCancel();
                          }
                        }}
                      />
                    </form>
                  </div>
                )}
                <div className="file-tree">
                  {renderFileTree(fileTree)}
                </div>
              </div>
            )}
            
            {activePanel === 'search' && (
              <div className="search-panel">
                <div className="panel-header">
                  <h3>Search</h3>
                </div>
                <input 
                  type="text" 
                  placeholder="Search files..."
                  className="search-input"
                />
                <div className="search-results">
                  <p>No results found</p>
                </div>
              </div>
            )}
            
            {activePanel === 'git' && (
              <div className="git-panel">
                <div className="panel-header">
                  <h3>Source Control</h3>
                </div>
                <div className="git-status">
                  <p>No changes detected</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Editor Area */}
        <div className="ide-editor">
          {openFiles.length > 0 ? (
            <div className="editor-container">
              <div className="editor-header">
                <span className="editor-file-name">{activeFile}</span>
                <div className="editor-actions">
                  <button className="editor-action" title="Format">🎨</button>
                  <button className="editor-action" title="Settings">⚙️</button>
                </div>
              </div>
              
              {/* Editor Toolbar */}
              {activeFile && (
                <div className="editor-toolbar">
                  <div className="toolbar-group">
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.getAction('editor.action.formatDocument').run()}
                      title="Format Document (Ctrl+Shift+F)"
                    >
                      🎨 Format
                    </button>
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.getAction('actions.find').run()}
                      title="Find (Ctrl+F)"
                    >
                      🔍 Find
                    </button>
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.getAction('editor.action.startFindReplaceAction').run()}
                      title="Find & Replace (Ctrl+H)"
                    >
                      🔄 Replace
                    </button>
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.getAction('editor.action.gotoLine').run()}
                      title="Go to Line (Ctrl+G)"
                    >
                      📍 Go to Line
                    </button>
                  </div>
                  <div className="toolbar-group">
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.getAction('editor.action.commentLine').run()}
                      title="Toggle Comment (Ctrl+/)"
                    >
                      💬 Comment
                    </button>
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.trigger('keyboard', 'editor.foldAll', {})}
                      title="Fold All"
                    >
                      📁 Fold All
                    </button>
                    <button 
                      className="toolbar-btn" 
                      onClick={() => editorRef.current?.trigger('keyboard', 'editor.unfoldAll', {})}
                      title="Unfold All"
                    >
                      📂 Unfold All
                    </button>
                  </div>
                  <div className="toolbar-group">
                    <span className="file-info">
                      {getLanguageFromExtension(activeFile).toUpperCase()} • Line {editorRef.current?.getPosition()?.lineNumber || 1}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="code-editor-area">
                <Editor
                  height="100%"
                  language={getLanguageFromExtension(activeFile)}
                  value={getFileContent(activeFile)}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme={editorTheme}
                  options={{
                    fontSize: 14,
                    fontFamily: 'Consolas, "Courier New", monospace',
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    minimap: { enabled: true },
                    wordWrap: 'on',
                    automaticLayout: true,
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: 'on',
                    tabCompletion: 'on',
                    parameterHints: { enabled: true },
                    quickSuggestions: true,
                    folding: true,
                    foldingStrategy: 'indentation',
                    showFoldingControls: 'always',
                    bracketPairColorization: { enabled: true },
                    guides: {
                      bracketPairs: true,
                      indentation: true
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="empty-editor">
              <div className="empty-state">
                <h3>Welcome to Professional IDE</h3>
                <p>Open a file from the explorer to start coding</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Panel */}
      <div className="ide-bottom">
        <div className="bottom-tabs">
          <button className="bottom-tab active">Terminal</button>
          <button className="bottom-tab">Problems ({problems.length})</button>
          <button className="bottom-tab">Output</button>
        </div>
        
        <div className="bottom-content">
          <div className="terminal-container">
            <div className="terminal-output" ref={terminalRef}>
              {terminalOutput.map((line, index) => (
                <div key={index} className={`terminal-line ${line.startsWith('$') ? 'prompt' : ''}`}>
                  {line}
                </div>
              ))}
              <div className="terminal-input-line">
                <span className="terminal-prompt">$ </span>
                <input
                  type="text"
                  className="terminal-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalCommand}
                  placeholder="Type a command..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="context-menu"
          style={{
            position: 'fixed',
            left: contextMenu.x,
            top: contextMenu.y,
            zIndex: 1000
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item" onClick={() => openFile(contextMenu.fileName.split('/').pop(), contextMenu.fileName.includes('/') ? contextMenu.fileName.split('/').slice(0, -1).join('/') : '')}>
            📂 Open
          </div>
          <div className="context-menu-item" onClick={() => deleteFile(contextMenu.fileName)}>
            🗑️ Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalIDE;