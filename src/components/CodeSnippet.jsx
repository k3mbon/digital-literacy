import React, { useState } from 'react';
import '../styles/CodeSnippet.css';

const CodeSnippet = ({ code, language = 'javascript', title = null }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const formatCode = (code) => {
    // Basic syntax highlighting for common languages
    let formattedCode = code;
    
    // JavaScript/Python keywords
    const keywords = [
      'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return',
      'def', 'class', 'import', 'from', 'as', 'try', 'except', 'finally',
      'true', 'false', 'null', 'undefined', 'None', 'True', 'False'
    ];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      formattedCode = formattedCode.replace(regex, `<span class="htb-keyword">${keyword}</span>`);
    });
    
    // Strings
    formattedCode = formattedCode.replace(/(["'])((?:\\.|(?!\1)[^\\])*)\1/g, 
      '<span class="htb-string">$1$2$1</span>');
    
    // Comments
    formattedCode = formattedCode.replace(/(#.*$|\/\/.*$)/gm, 
      '<span class="htb-comment">$1</span>');
    
    // Numbers
    formattedCode = formattedCode.replace(/\b\d+(\.\d+)?\b/g, 
      '<span class="htb-number">$&</span>');
    
    return formattedCode;
  };

  return (
    <div className="htb-code-snippet">
      {title && (
        <div className="htb-code-title">
          <span className="htb-code-language">{language}</span>
          <span className="htb-code-title-text">{title}</span>
        </div>
      )}
      <div className="htb-code-container">
        <button 
          className={`htb-copy-btn ${copied ? 'copied' : ''}`}
          onClick={copyToClipboard}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <span className="htb-copy-icon">✓</span>
          ) : (
            <span className="htb-copy-icon">📋</span>
          )}
        </button>
        <pre className="htb-code-block">
          <code 
            className={`htb-code language-${language}`}
            dangerouslySetInnerHTML={{ __html: formatCode(code) }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;