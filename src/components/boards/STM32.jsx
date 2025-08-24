import React from 'react';

const STM32 = ({ board, isRunning, onPinClick, connectedPins, hoveredPin, onPinHover, selectedPin }) => {
  // Helper functions for pin interactions
  const handlePinClick = (pinType, pinNumber) => {
    if (onPinClick) {
      onPinClick({ type: pinType, number: pinNumber, board: 'stm32' });
    }
  };

  const handlePinHover = (pinType, pinNumber) => {
    if (onPinHover) {
      onPinHover({ type: pinType, number: pinNumber, board: 'stm32' });
    }
  };

  const isPinConnected = (pinType, pinNumber) => {
    return connectedPins && connectedPins.some(pin => 
      pin.type === pinType && pin.number === pinNumber && pin.board === 'stm32'
    );
  };

  const isPinHovered = (pinType, pinNumber) => {
    return hoveredPin && 
      hoveredPin.type === pinType && 
      hoveredPin.number === pinNumber && 
      hoveredPin.board === 'stm32';
  };

  const isPinSelected = (pinType, pinNumber) => {
    return selectedPin && 
      selectedPin.type === pinType && 
      selectedPin.number === pinNumber && 
      selectedPin.board === 'stm32';
  };
  return (
    <div className="stm32-board">
      <svg width="350" height="250" viewBox="0 0 350 250" className="board-svg">
        {/* Board Base */}
        <rect 
          x="20" 
          y="20" 
          width="310" 
          height="210" 
          rx="8" 
          ry="8" 
          fill="#1976D2" 
          stroke="#0D47A1" 
          strokeWidth="2"
        />
        
        {/* USB Micro Connector */}
        <rect 
          x="5" 
          y="100" 
          width="25" 
          height="15" 
          rx="3" 
          ry="3" 
          fill="#37474F" 
          stroke="#263238" 
          strokeWidth="1"
        />
        
        {/* STM32 Chip */}
        <rect 
          x="120" 
          y="80" 
          width="110" 
          height="90" 
          rx="5" 
          ry="5" 
          fill="#263238" 
          stroke="#37474F" 
          strokeWidth="1"
        />
        <text x="175" y="105" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">STM32F103</text>
        <text x="175" y="118" fontSize="8" fill="#90A4AE" textAnchor="middle">ARM Cortex-M3</text>
        <text x="175" y="130" fontSize="7" fill="#90A4AE" textAnchor="middle">72MHz</text>
        <text x="175" y="142" fontSize="6" fill="#90A4AE" textAnchor="middle">128KB Flash</text>
        <text x="175" y="152" fontSize="6" fill="#90A4AE" textAnchor="middle">20KB RAM</text>
        
        {/* Crystal Oscillator */}
        <rect 
          x="90" 
          y="110" 
          width="20" 
          height="10" 
          rx="2" 
          ry="2" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        <text x="100" y="105" fontSize="5" fill="white" textAnchor="middle">8MHz</text>
        
        {/* 32.768kHz Crystal */}
        <rect 
          x="250" 
          y="110" 
          width="15" 
          height="8" 
          rx="2" 
          ry="2" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        <text x="257.5" y="105" fontSize="4" fill="white" textAnchor="middle">32.768kHz</text>
        
        {/* Built-in LED (PC13) */}
        <circle 
          cx="280" 
          cy="60" 
          r="5" 
          fill={isRunning ? '#FF5722' : '#666666'} 
          stroke="#333333" 
          strokeWidth="1"
        >
          {isRunning && (
            <animate 
              attributeName="fill" 
              values="#FF5722;#FF8A65;#FF5722" 
              dur="1.2s" 
              repeatCount="indefinite"
            />
          )}
        </circle>
        <text x="280" y="50" fontSize="6" fill="white" textAnchor="middle">PC13</text>
        
        {/* Power LED */}
        <circle 
          cx="260" 
          cy="60" 
          r="3" 
          fill="#4CAF50" 
          stroke="#2E7D32" 
          strokeWidth="1"
        />
        <text x="260" y="50" fontSize="6" fill="white" textAnchor="middle">PWR</text>
        
        {/* Reset Button */}
        <rect 
          x="60" 
          y="55" 
          width="18" 
          height="12" 
          rx="2" 
          ry="2" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="69" y="50" fontSize="6" fill="white" textAnchor="middle">RST</text>
        
        {/* Boot0 Jumper */}
        <rect 
          x="60" 
          y="75" 
          width="18" 
          height="8" 
          rx="1" 
          ry="1" 
          fill="#FFD700" 
          stroke="#FFA000" 
          strokeWidth="1"
        />
        <text x="69" y="70" fontSize="5" fill="black" textAnchor="middle">BOOT0</text>
        
        {/* Boot1 Jumper */}
        <rect 
          x="60" 
          y="90" 
          width="18" 
          height="8" 
          rx="1" 
          ry="1" 
          fill="#FFD700" 
          stroke="#FFA000" 
          strokeWidth="1"
        />
        <text x="69" y="85" fontSize="5" fill="black" textAnchor="middle">BOOT1</text>
        
        {/* Left Pin Headers (PA0-PA15) */}
        <g className="left-pins">
          <rect 
            x="35" 
            y="40" 
            width="8" 
            height="170" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 20 }, (_, i) => {
            const pinLabels = ['VB', 'C13', 'C14', 'C15', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B0', 'B1', 'B10', 'B11', '3V3', 'GND', '5V', 'GND'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.match(/^[ABC]\d+$/) ? 'digital' : pinLabel.match(/^A\d+$/) ? 'analog' : 'power';
            const pinNumber = pinLabel.match(/^[ABC](\d+)$/) ? pinLabel : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={36} 
                  y={45 + i * 8} 
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
                  cx={39}
                  cy={46 + i * 8}
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
                  y={47 + i * 8} 
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
        
        {/* Right Pin Headers (PB0-PB15) */}
        <g className="right-pins">
          <rect 
            x="307" 
            y="40" 
            width="8" 
            height="170" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 20 }, (_, i) => {
            const pinLabels = ['3V3', 'GND', '5V', 'B9', 'B8', 'B7', 'B6', 'B5', 'B4', 'B3', 'A15', 'A12', 'A11', 'A10', 'A9', 'A8', 'B15', 'B14', 'B13', 'B12'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.match(/^[ABC]\d+$/) ? 'digital' : pinLabel.match(/^A\d+$/) ? 'analog' : 'power';
            const pinNumber = pinLabel.match(/^[ABC](\d+)$/) ? pinLabel : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={308} 
                  y={45 + i * 8} 
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
                  cx={311}
                  cy={46 + i * 8}
                  r="1.5"
                  className="pin-indicator"
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : 'rgba(255, 255, 255, 0.8)'}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                  style={{ cursor: 'pointer' }}
                />
                <text 
                  x={320} 
                  y={47 + i * 8} 
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
        
        {/* SWD Debug Header */}
        <g className="swd-header">
          <rect 
            x="280" 
            y="180" 
            width="30" 
            height="15" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 4 }, (_, i) => (
            <circle 
              key={i}
              cx={285 + i * 5} 
              cy={187.5} 
              r="1.5" 
              fill="#FFD700"
            />
          ))}
          <text x="295" y="175" fontSize="6" fill="white" textAnchor="middle">SWD</text>
        </g>
        
        {/* JTAG Header */}
        <g className="jtag-header">
          <rect 
            x="280" 
            y="200" 
            width="40" 
            height="20" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 20 }, (_, i) => (
            <circle 
              key={i}
              cx={285 + (i % 10) * 3} 
              cy={205 + Math.floor(i / 10) * 5} 
              r="1" 
              fill="#FFD700"
            />
          ))}
          <text x="300" y="195" fontSize="6" fill="white" textAnchor="middle">JTAG</text>
        </g>
        
        {/* Voltage Regulator */}
        <rect 
          x="50" 
          y="120" 
          width="25" 
          height="20" 
          rx="2" 
          ry="2" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="62.5" y="132" fontSize="6" fill="white" textAnchor="middle">3.3V</text>
        <text x="62.5" y="140" fontSize="5" fill="#90A4AE" textAnchor="middle">REG</text>
        
        {/* Capacitors */}
        <circle cx="85" cy="140" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="95" cy="140" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="255" cy="140" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="265" cy="140" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        
        {/* Board Labels */}
        <text x="50" y="235" fontSize="10" fill="white" fontWeight="bold">STM32F103C8T6</text>
        <text x="280" y="235" fontSize="8" fill="white">Blue Pill</text>
        
        {/* ST Logo Area */}
        <rect 
          x="280" 
          y="80" 
          width="40" 
          height="25" 
          rx="3" 
          ry="3" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <text x="300" y="95" fontSize="8" fill="#1976D2" textAnchor="middle" fontWeight="bold">ST</text>
        <text x="300" y="103" fontSize="6" fill="#666666" textAnchor="middle">Micro</text>
      </svg>
      
      {/* Pin Tooltips */}
      <div className="pin-tooltips">
        {board.pins.digital.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip digital"
            style={{
              position: 'absolute',
              left: index < 20 ? '36px' : '308px',
              top: `${45 + (index % 20) * 8}px`,
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

export default STM32;