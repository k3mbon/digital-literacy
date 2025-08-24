import React, { useState, useRef, useEffect } from 'react';

const SerialMonitor = ({ isConnected, messages, onSend, onClear, baudRate, onBaudRateChange }) => {
  const [input, setInput] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const baudRates = [9600, 19200, 38400, 57600, 115200];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  const handleSend = () => {
    if (input.trim() && onSend) {
      onSend(input.trim());
      setInput('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  const getMessageTypeClass = (type) => {
    switch (type) {
      case 'sent':
        return 'message-sent';
      case 'received':
        return 'message-received';
      case 'error':
        return 'message-error';
      case 'system':
        return 'message-system';
      default:
        return 'message-default';
    }
  };

  return (
    <div className="serial-monitor">
      <div className="serial-header">
        <div className="serial-title">
          <span className="serial-icon">📡</span>
          <span>Serial Monitor</span>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        
        <div className="serial-controls">
          <div className="baud-rate-selector">
            <label htmlFor="baudRate">Baud Rate:</label>
            <select 
              id="baudRate"
              value={baudRate || 9600} 
              onChange={(e) => onBaudRateChange && onBaudRateChange(parseInt(e.target.value))}
            >
              {baudRates.map(rate => (
                <option key={rate} value={rate}>{rate}</option>
              ))}
            </select>
          </div>
          
          <div className="monitor-options">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={autoScroll} 
                onChange={(e) => setAutoScroll(e.target.checked)}
              />
              <span className="checkmark"></span>
              Auto-scroll
            </label>
          </div>
          
          <button 
            className="clear-btn"
            onClick={onClear}
            title="Clear Monitor"
          >
            <span className="clear-icon">🗑️</span>
            Clear
          </button>
        </div>
      </div>
      
      <div className="serial-body">
        <div className="messages-container">
          {messages && messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className={`message ${getMessageTypeClass(message.type)}`}>
                <span className="message-timestamp">
                  [{formatTimestamp(message.timestamp)}]
                </span>
                <span className="message-type">
                  {message.type === 'sent' ? '→' : 
                   message.type === 'received' ? '←' : 
                   message.type === 'error' ? '⚠' : 
                   message.type === 'system' ? 'ℹ' : '•'}
                </span>
                <span className="message-content">
                  {message.content}
                </span>
              </div>
            ))
          ) : (
            <div className="no-messages">
              <div className="no-messages-icon">📭</div>
              <p>No messages yet</p>
              <p className="no-messages-hint">
                Start your Arduino program to see serial output here
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="serial-input">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type message and press Enter..." : "Connect to send messages"}
            disabled={!isConnected}
            className="message-input"
          />
          <button 
            className="send-btn"
            onClick={handleSend}
            disabled={!isConnected || !input.trim()}
            title="Send Message"
          >
            <span className="send-icon">📤</span>
            Send
          </button>
        </div>
        
        <div className="input-options">
          <div className="line-ending">
            <label htmlFor="lineEnding">Line ending:</label>
            <select id="lineEnding" defaultValue="newline">
              <option value="none">No line ending</option>
              <option value="newline">Newline</option>
              <option value="carriage">Carriage return</option>
              <option value="both">Both NL & CR</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerialMonitor;