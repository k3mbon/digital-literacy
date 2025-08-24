import React from 'react';

const ArduinoUno = ({ board, isRunning, onPinClick, connectedPins = [], hoveredPin, onPinHover }) => {
  const handlePinClick = (pinType, pinNumber) => {
    if (onPinClick) {
      onPinClick({ type: pinType, number: pinNumber, board: 'uno' });
    }
  };

  const handlePinHover = (pinType, pinNumber, isHovering) => {
    if (onPinHover) {
      onPinHover(isHovering ? { type: pinType, number: pinNumber, board: 'uno' } : null);
    }
  };

  const isPinConnected = (pinType, pinNumber) => {
    return connectedPins.some(pin => pin.type === pinType && pin.number === pinNumber);
  };

  const isPinHovered = (pinType, pinNumber) => {
    return hoveredPin && hoveredPin.type === pinType && hoveredPin.number === pinNumber;
  };

  return (
    <div className="arduino-uno-board">
      <svg width="400" height="300" viewBox="0 0 400 300" className="board-svg">
        {/* Board Base */}
        <rect 
          x="20" 
          y="20" 
          width="360" 
          height="260" 
          rx="10" 
          ry="10" 
          fill="#2E7D32" 
          stroke="#1B5E20" 
          strokeWidth="2"
        />
        
        {/* USB Connector */}
        <rect 
          x="5" 
          y="80" 
          width="25" 
          height="40" 
          rx="3" 
          ry="3" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        
        {/* Power Jack */}
        <circle 
          cx="50" 
          cy="50" 
          r="12" 
          fill="#000000" 
          stroke="#333333" 
          strokeWidth="1"
        />
        <circle 
          cx="50" 
          cy="50" 
          r="8" 
          fill="#333333"
        />
        
        {/* Reset Button */}
        <rect 
          x="120" 
          y="35" 
          width="20" 
          height="15" 
          rx="2" 
          ry="2" 
          fill="#FF5722" 
          stroke="#D84315" 
          strokeWidth="1"
        />
        <text x="130" y="30" fontSize="8" fill="white" textAnchor="middle">RESET</text>
        
        {/* Arduino Logo Area */}
        <rect 
          x="180" 
          y="40" 
          width="80" 
          height="30" 
          rx="5" 
          ry="5" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <text x="220" y="58" fontSize="12" fill="#2E7D32" textAnchor="middle" fontWeight="bold">ARDUINO</text>
        
        {/* Built-in LED (Pin 13) */}
        <circle 
          cx="320" 
          cy="60" 
          r="6" 
          fill={isRunning ? '#FFD700' : '#666666'} 
          stroke="#333333" 
          strokeWidth="1"
        >
          {isRunning && (
            <animate 
              attributeName="fill" 
              values="#FFD700;#FFA000;#FFD700" 
              dur="1s" 
              repeatCount="indefinite"
            />
          )}
        </circle>
        <text x="320" y="80" fontSize="6" fill="white" textAnchor="middle">L</text>
        
        {/* Power LED */}
        <circle 
          cx="300" 
          cy="60" 
          r="4" 
          fill="#4CAF50" 
          stroke="#2E7D32" 
          strokeWidth="1"
        />
        <text x="300" y="75" fontSize="6" fill="white" textAnchor="middle">PWR</text>
        
        {/* Digital Pins Header */}
        <g className="digital-pins">
          <rect 
            x="40" 
            y="100" 
            width="200" 
            height="20" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 14 }, (_, i) => {
            const isConnected = isPinConnected('digital', i);
            const isHovered = isPinHovered('digital', i);
            return (
              <g key={i}>
                <rect 
                  x={50 + i * 13} 
                  y={102} 
                  width="3" 
                  height="16" 
                  fill={isConnected ? '#4CAF50' : isHovered ? '#FFC107' : '#FFD700'}
                  stroke={isConnected ? '#2E7D32' : isHovered ? '#FF8F00' : 'none'}
                  strokeWidth={isConnected || isHovered ? '1' : '0'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('digital', i)}
                  onMouseEnter={() => handlePinHover('digital', i, true)}
                  onMouseLeave={() => handlePinHover('digital', i, false)}
                />
                {/* Pin indicator circle for better visibility */}
                <circle
                  cx={51.5 + i * 13}
                  cy={110}
                  r={isConnected ? '3' : isHovered ? '2.5' : '0'}
                  fill={isConnected ? '#4CAF50' : '#FFC107'}
                  opacity="0.7"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('digital', i)}
                  onMouseEnter={() => handlePinHover('digital', i, true)}
                  onMouseLeave={() => handlePinHover('digital', i, false)}
                />
                <text 
                  x={51.5 + i * 13} 
                  y={95} 
                  fontSize="6" 
                  fill="white" 
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  {i}
                </text>
                {/* PWM indicator for pins 3, 5, 6, 9, 10, 11 */}
                {[3, 5, 6, 9, 10, 11].includes(i) && (
                  <text 
                    x={51.5 + i * 13} 
                    y={88} 
                    fontSize="4" 
                    fill="#FFC107" 
                    textAnchor="middle"
                    style={{ pointerEvents: 'none' }}
                  >
                    ~
                  </text>
                )}
              </g>
            );
          })}
          <text x="140" y="135" fontSize="8" fill="white" textAnchor="middle">DIGITAL (PWM: ~)</text>
        </g>
        
        {/* Analog Pins Header */}
        <g className="analog-pins">
          <rect 
            x="280" 
            y="180" 
            width="80" 
            height="20" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 6 }, (_, i) => {
            const isConnected = isPinConnected('analog', i);
            const isHovered = isPinHovered('analog', i);
            return (
              <g key={i}>
                <rect 
                  x={290 + i * 11} 
                  y={182} 
                  width="3" 
                  height="16" 
                  fill={isConnected ? '#FF5722' : isHovered ? '#FF9800' : '#FFD700'}
                  stroke={isConnected ? '#D84315' : isHovered ? '#F57C00' : 'none'}
                  strokeWidth={isConnected || isHovered ? '1' : '0'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('analog', i)}
                  onMouseEnter={() => handlePinHover('analog', i, true)}
                  onMouseLeave={() => handlePinHover('analog', i, false)}
                />
                {/* Pin indicator circle for better visibility */}
                <circle
                  cx={291.5 + i * 11}
                  cy={190}
                  r={isConnected ? '3' : isHovered ? '2.5' : '0'}
                  fill={isConnected ? '#FF5722' : '#FF9800'}
                  opacity="0.7"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('analog', i)}
                  onMouseEnter={() => handlePinHover('analog', i, true)}
                  onMouseLeave={() => handlePinHover('analog', i, false)}
                />
                <text 
                  x={291.5 + i * 11} 
                  y={175} 
                  fontSize="6" 
                  fill="white" 
                  textAnchor="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  A{i}
                </text>
              </g>
            );
          })}
          <text x="320" y="215" fontSize="8" fill="white" textAnchor="middle">ANALOG IN</text>
        </g>
        
        {/* Power Pins Header */}
        <g className="power-pins">
          <rect 
            x="280" 
            y="100" 
            width="80" 
            height="20" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {['IOREF', 'RST', '3V3', '5V', 'GND', 'GND', 'VIN'].map((label, i) => {
            const isConnected = isPinConnected('power', label);
            const isHovered = isPinHovered('power', label);
            return (
              <g key={i}>
                <rect 
                  x={290 + i * 10} 
                  y={102} 
                  width="3" 
                  height="16" 
                  fill={isConnected ? '#9C27B0' : isHovered ? '#E91E63' : '#FFD700'}
                  stroke={isConnected ? '#6A1B9A' : isHovered ? '#C2185B' : 'none'}
                  strokeWidth={isConnected || isHovered ? '1' : '0'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('power', label)}
                  onMouseEnter={() => handlePinHover('power', label, true)}
                  onMouseLeave={() => handlePinHover('power', label, false)}
                />
                {/* Pin indicator circle for better visibility */}
                <circle
                  cx={291.5 + i * 10}
                  cy={110}
                  r={isConnected ? '3' : isHovered ? '2.5' : '0'}
                  fill={isConnected ? '#9C27B0' : '#E91E63'}
                  opacity="0.7"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick('power', label)}
                  onMouseEnter={() => handlePinHover('power', label, true)}
                  onMouseLeave={() => handlePinHover('power', label, false)}
                />
                <text 
                  x={291.5 + i * 10} 
                  y={95} 
                  fontSize="5" 
                  fill="white" 
                  textAnchor="middle" 
                  transform={`rotate(-45 ${291.5 + i * 10} 95)`}
                  style={{ pointerEvents: 'none' }}
                >
                  {label}
                </text>
              </g>
            );
          })}
          <text x="330" y="135" fontSize="8" fill="white" textAnchor="middle">POWER</text>
        </g>
        
        {/* ICSP Headers */}
        <g className="icsp-header">
          <rect 
            x="200" 
            y="120" 
            width="30" 
            height="20" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 6 }, (_, i) => (
            <circle 
              key={i}
              cx={210 + (i % 2) * 10} 
              cy={125 + Math.floor(i / 2) * 5} 
              r="1.5" 
              fill="#FFD700"
            />
          ))}
          <text x="215" y="150" fontSize="6" fill="white" textAnchor="middle">ICSP</text>
        </g>
        
        {/* Microcontroller */}
        <rect 
          x="120" 
          y="150" 
          width="80" 
          height="60" 
          rx="5" 
          ry="5" 
          fill="#1A1A1A" 
          stroke="#333333" 
          strokeWidth="1"
        />
        <text x="160" y="175" fontSize="8" fill="white" textAnchor="middle">ATMEGA</text>
        <text x="160" y="185" fontSize="8" fill="white" textAnchor="middle">328P</text>
        
        {/* Crystal Oscillator */}
        <rect 
          x="90" 
          y="170" 
          width="20" 
          height="8" 
          rx="2" 
          ry="2" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        <text x="100" y="185" fontSize="6" fill="white" textAnchor="middle">16MHz</text>
        
        {/* Capacitors */}
        <circle cx="85" cy="190" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="115" cy="190" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        
        {/* Board Labels */}
        <text x="50" y="270" fontSize="10" fill="white" fontWeight="bold">Arduino UNO R3</text>
        <text x="320" y="270" fontSize="8" fill="white">Made in Italy</text>
      </svg>
      
      {/* Pin Tooltips */}
      <div className="pin-tooltips">
        {board.pins.digital.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip digital"
            style={{
              position: 'absolute',
              left: `${50 + index * 13}px`,
              top: '120px',
              width: '3px',
              height: '16px'
            }}
            title={`Digital Pin ${pin.label} - ${pin.type}`}
          />
        ))}
        
        {board.pins.analog.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip analog"
            style={{
              position: 'absolute',
              left: `${290 + index * 11}px`,
              top: '200px',
              width: '3px',
              height: '16px'
            }}
            title={`Analog Pin ${pin.label} - ${pin.type}`}
          />
        ))}
        
        {board.pins.power.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip power"
            style={{
              position: 'absolute',
              left: `${290 + index * 10}px`,
              top: '120px',
              width: '3px',
              height: '16px'
            }}
            title={`Power Pin ${pin.label} - ${pin.type}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArduinoUno;