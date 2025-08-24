import React from 'react';

const ESP32 = ({ board, isRunning, onPinClick, connectedPins, hoveredPin, onPinHover, selectedPin }) => {
  // Helper functions for pin interactions
  const handlePinClick = (pinType, pinNumber) => {
    if (onPinClick) {
      onPinClick({ type: pinType, number: pinNumber, board: 'esp32' });
    }
  };

  const handlePinHover = (pinType, pinNumber) => {
    if (onPinHover) {
      onPinHover({ type: pinType, number: pinNumber, board: 'esp32' });
    }
  };

  const isPinConnected = (pinType, pinNumber) => {
    return connectedPins && connectedPins.some(pin => 
      pin.type === pinType && pin.number === pinNumber && pin.board === 'esp32'
    );
  };

  const isPinHovered = (pinType, pinNumber) => {
    return hoveredPin && 
      hoveredPin.type === pinType && 
      hoveredPin.number === pinNumber && 
      hoveredPin.board === 'esp32';
  };

  const isPinSelected = (pinType, pinNumber) => {
    return selectedPin && 
      selectedPin.type === pinType && 
      selectedPin.number === pinNumber && 
      selectedPin.board === 'esp32';
  };
  return (
    <div className="esp32-board">
      <svg width="400" height="200" viewBox="0 0 400 200" className="board-svg">
        {/* Board Base */}
        <rect 
          x="20" 
          y="20" 
          width="360" 
          height="160" 
          rx="8" 
          ry="8" 
          fill="#1565C0" 
          stroke="#0D47A1" 
          strokeWidth="2"
        />
        
        {/* USB-C Connector */}
        <rect 
          x="5" 
          y="80" 
          width="25" 
          height="20" 
          rx="10" 
          ry="10" 
          fill="#37474F" 
          stroke="#263238" 
          strokeWidth="1"
        />
        
        {/* ESP32 Chip */}
        <rect 
          x="150" 
          y="70" 
          width="100" 
          height="60" 
          rx="5" 
          ry="5" 
          fill="#263238" 
          stroke="#37474F" 
          strokeWidth="1"
        />
        <text x="200" y="95" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">ESP32</text>
        <text x="200" y="108" fontSize="8" fill="#90A4AE" textAnchor="middle">WROOM-32</text>
        <text x="200" y="120" fontSize="6" fill="#90A4AE" textAnchor="middle">WiFi + Bluetooth</text>
        
        {/* Antenna */}
        <g className="antenna">
          <path 
            d="M 270 80 Q 290 70 310 80 Q 330 90 350 80 Q 370 70 390 80" 
            stroke="#FFD700" 
            strokeWidth="2" 
            fill="none"
          />
          <circle cx="390" cy="80" r="3" fill="#FFD700"/>
        </g>
        
        {/* Built-in LED */}
        <circle 
          cx="320" 
          cy="50" 
          r="5" 
          fill={isRunning ? '#00E676' : '#666666'} 
          stroke="#333333" 
          strokeWidth="1"
        >
          {isRunning && (
            <animate 
              attributeName="fill" 
              values="#00E676;#4CAF50;#00E676" 
              dur="0.8s" 
              repeatCount="indefinite"
            />
          )}
        </circle>
        <text x="320" y="40" fontSize="6" fill="white" textAnchor="middle">LED</text>
        
        {/* Power LED */}
        <circle 
          cx="300" 
          cy="50" 
          r="3" 
          fill="#F44336" 
          stroke="#D32F2F" 
          strokeWidth="1"
        />
        <text x="300" y="40" fontSize="6" fill="white" textAnchor="middle">PWR</text>
        
        {/* Boot Button */}
        <rect 
          x="80" 
          y="45" 
          width="20" 
          height="15" 
          rx="3" 
          ry="3" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="90" y="40" fontSize="6" fill="white" textAnchor="middle">BOOT</text>
        
        {/* EN Button */}
        <rect 
          x="110" 
          y="45" 
          width="20" 
          height="15" 
          rx="3" 
          ry="3" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="120" y="40" fontSize="6" fill="white" textAnchor="middle">EN</text>
        
        {/* Left Pin Header */}
        <g className="left-pins">
          <rect 
            x="35" 
            y="40" 
            width="10" 
            height="120" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 15 }, (_, i) => {
            const pinLabels = ['3V3', 'GND', 'D15', 'D2', 'D4', 'D16', 'D17', 'D5', 'D18', 'D19', 'D21', 'D3', 'D1', 'D22', 'D23'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.startsWith('D') ? 'digital' : 'power';
            const pinNumber = pinLabel.startsWith('D') ? parseInt(pinLabel.substring(1)) : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={37} 
                  y={45 + i * 7.5} 
                  width="6" 
                  height="2" 
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : '#FFD700'}
                  stroke={isSelected ? '#0056b3' : isConnected ? '#20c997' : isHovered ? '#ffca2c' : '#DAA520'}
                  strokeWidth={isSelected ? '2' : isConnected || isHovered ? '1.5' : '1'}
                  className="pin-interactive"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                />
                {/* Pin indicator circle */}
                <circle
                  cx={40}
                  cy={46 + i * 7.5}
                  r="1.5"
                  className="pin-indicator"
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : 'rgba(255, 255, 255, 0.8)'}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                  style={{ cursor: 'pointer' }}
                />
                <text 
                  x={30} 
                  y={47 + i * 7.5} 
                  fontSize="5" 
                  fill="white" 
                  textAnchor="end"
                >
                  {pinLabel}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Right Pin Header */}
        <g className="right-pins">
          <rect 
            x="355" 
            y="40" 
            width="10" 
            height="120" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 15 }, (_, i) => {
            const pinLabels = ['VIN', 'GND', 'D13', 'D12', 'D14', 'D27', 'D26', 'D25', 'D33', 'D32', 'D35', 'D34', 'VN', 'VP', 'EN'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.startsWith('D') ? 'digital' : pinLabel.startsWith('A') ? 'analog' : 'power';
            const pinNumber = pinLabel.startsWith('D') ? parseInt(pinLabel.substring(1)) : pinLabel.startsWith('A') ? parseInt(pinLabel.substring(1)) : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={357} 
                  y={45 + i * 7.5} 
                  width="6" 
                  height="2" 
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : '#FFD700'}
                  stroke={isSelected ? '#0056b3' : isConnected ? '#20c997' : isHovered ? '#ffca2c' : '#DAA520'}
                  strokeWidth={isSelected ? '2' : isConnected || isHovered ? '1.5' : '1'}
                  className="pin-interactive"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                />
                {/* Pin indicator circle */}
                <circle
                  cx={360}
                  cy={46 + i * 7.5}
                  r="1.5"
                  className="pin-indicator"
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : 'rgba(255, 255, 255, 0.8)'}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                  style={{ cursor: 'pointer' }}
                />
                <text 
                  x={370} 
                  y={47 + i * 7.5} 
                  fontSize="5" 
                  fill="white" 
                  textAnchor="start"
                >
                  {pinLabel}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Crystal Oscillator */}
        <rect 
          x="120" 
          y="90" 
          width="15" 
          height="8" 
          rx="2" 
          ry="2" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        <text x="127.5" y="105" fontSize="5" fill="white" textAnchor="middle">40MHz</text>
        
        {/* Flash Memory */}
        <rect 
          x="280" 
          y="90" 
          width="25" 
          height="20" 
          rx="2" 
          ry="2" 
          fill="#37474F" 
          stroke="#263238" 
          strokeWidth="1"
        />
        <text x="292.5" y="102" fontSize="6" fill="white" textAnchor="middle">FLASH</text>
        <text x="292.5" y="110" fontSize="5" fill="#90A4AE" textAnchor="middle">4MB</text>
        
        {/* Voltage Regulator */}
        <rect 
          x="60" 
          y="80" 
          width="20" 
          height="15" 
          rx="2" 
          ry="2" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="70" y="90" fontSize="5" fill="white" textAnchor="middle">3.3V</text>
        <text x="70" y="97" fontSize="4" fill="#90A4AE" textAnchor="middle">REG</text>
        
        {/* Capacitors */}
        <circle cx="100" cy="120" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="110" cy="120" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="290" cy="120" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="300" cy="120" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        
        {/* Board Labels */}
        <text x="50" y="170" fontSize="10" fill="white" fontWeight="bold">ESP32 DevKit V1</text>
        <text x="320" y="170" fontSize="8" fill="white">Espressif</text>
        
        {/* WiFi/Bluetooth Icons */}
        <g className="wifi-icon">
          <path 
            d="M 340 120 Q 350 115 360 120" 
            stroke="#00E676" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            d="M 335 125 Q 350 110 365 125" 
            stroke="#00E676" 
            strokeWidth="1.5" 
            fill="none"
          />
          <path 
            d="M 330 130 Q 350 105 370 130" 
            stroke="#00E676" 
            strokeWidth="1" 
            fill="none"
          />
          <circle cx="350" cy="135" r="2" fill="#00E676"/>
        </g>
        
        <g className="bluetooth-icon">
          <path 
            d="M 320 140 L 330 130 L 325 125 L 330 120 L 320 110 L 320 125 L 315 120 M 320 125 L 315 130" 
            stroke="#2196F3" 
            strokeWidth="1.5" 
            fill="none"
          />
        </g>
      </svg>
      
      {/* Pin Tooltips */}
      <div className="pin-tooltips">
        {board.pins.digital.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip digital"
            style={{
              position: 'absolute',
              left: index < 15 ? '37px' : '357px',
              top: `${45 + (index % 15) * 7.5}px`,
              width: '6px',
              height: '2px'
            }}
            title={`Pin ${pin.label} - ${pin.type}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ESP32;