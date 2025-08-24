import React from 'react';

const PiPico = ({ board, isRunning, onPinClick, connectedPins = [], hoveredPin, onPinHover, selectedPin }) => {
  // Helper functions for pin interactions
  const handlePinClick = (pinType, pinNumber) => {
    if (onPinClick) {
      onPinClick({ type: pinType, number: pinNumber });
    }
  };

  const handlePinHover = (pinType, pinNumber) => {
    if (onPinHover) {
      onPinHover(pinType && pinNumber ? { type: pinType, number: pinNumber } : null);
    }
  };

  const isPinConnected = (pinType, pinNumber) => {
    return connectedPins.some(pin => pin.type === pinType && pin.number === pinNumber);
  };

  const isPinHovered = (pinType, pinNumber) => {
    return hoveredPin && hoveredPin.type === pinType && hoveredPin.number === pinNumber;
  };

  const isPinSelected = (pinType, pinNumber) => {
    return selectedPin && selectedPin.type === pinType && selectedPin.number === pinNumber;
  };
  return (
    <div className="pi-pico-board">
      <svg width="300" height="400" viewBox="0 0 300 400" className="board-svg">
        {/* Board Base */}
        <rect 
          x="20" 
          y="20" 
          width="260" 
          height="360" 
          rx="10" 
          ry="10" 
          fill="#2E7D32" 
          stroke="#1B5E20" 
          strokeWidth="2"
        />
        
        {/* USB Micro Connector */}
        <rect 
          x="120" 
          y="5" 
          width="60" 
          height="25" 
          rx="5" 
          ry="5" 
          fill="#37474F" 
          stroke="#263238" 
          strokeWidth="1"
        />
        
        {/* RP2040 Chip */}
        <rect 
          x="110" 
          y="150" 
          width="80" 
          height="80" 
          rx="5" 
          ry="5" 
          fill="#263238" 
          stroke="#37474F" 
          strokeWidth="1"
        />
        <text x="150" y="175" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">RP2040</text>
        <text x="150" y="188" fontSize="8" fill="#90A4AE" textAnchor="middle">Dual ARM</text>
        <text x="150" y="200" fontSize="8" fill="#90A4AE" textAnchor="middle">Cortex-M0+</text>
        <text x="150" y="212" fontSize="7" fill="#90A4AE" textAnchor="middle">133MHz</text>
        <text x="150" y="222" fontSize="6" fill="#90A4AE" textAnchor="middle">264KB RAM</text>
        
        {/* Flash Memory */}
        <rect 
          x="200" 
          y="120" 
          width="30" 
          height="25" 
          rx="3" 
          ry="3" 
          fill="#37474F" 
          stroke="#263238" 
          strokeWidth="1"
        />
        <text x="215" y="135" fontSize="7" fill="white" textAnchor="middle">FLASH</text>
        <text x="215" y="143" fontSize="6" fill="#90A4AE" textAnchor="middle">2MB</text>
        
        {/* Crystal Oscillator */}
        <rect 
          x="70" 
          y="170" 
          width="20" 
          height="10" 
          rx="2" 
          ry="2" 
          fill="#C0C0C0" 
          stroke="#808080" 
          strokeWidth="1"
        />
        <text x="80" y="165" fontSize="5" fill="white" textAnchor="middle">12MHz</text>
        
        {/* Built-in LED (GPIO25) */}
        <circle 
          cx="220" 
          cy="80" 
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
        <text x="220" y="70" fontSize="6" fill="white" textAnchor="middle">LED</text>
        
        {/* BOOTSEL Button */}
        <rect 
          x="80" 
          y="70" 
          width="20" 
          height="15" 
          rx="3" 
          ry="3" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <text x="90" y="65" fontSize="6" fill="black" textAnchor="middle">BOOTSEL</text>
        
        {/* RUN/Reset Button */}
        <rect 
          x="110" 
          y="70" 
          width="20" 
          height="15" 
          rx="3" 
          ry="3" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <text x="120" y="65" fontSize="6" fill="black" textAnchor="middle">RUN</text>
        
        {/* Left Pin Header (GPIO0-GPIO22) */}
        <g className="left-pins">
          <rect 
            x="35" 
            y="50" 
            width="8" 
            height="300" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 20 }, (_, i) => {
            const pinLabels = ['GP0', 'GP1', 'GND', 'GP2', 'GP3', 'GP4', 'GP5', 'GND', 'GP6', 'GP7', 'GP8', 'GP9', 'GND', 'GP10', 'GP11', 'GP12', 'GP13', 'GND', 'GP14', 'GP15'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.startsWith('GP') ? 'digital' : 'power';
            const pinNumber = pinLabel.startsWith('GP') ? pinLabel : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={36} 
                  y={55 + i * 14} 
                  width="6" 
                  height="3" 
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
                  cy={56.5 + i * 14}
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
                  y={58 + i * 14} 
                  fontSize="6" 
                  fill="white" 
                  textAnchor="end"
                >
                  {pinLabel}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Right Pin Header (GPIO16-GPIO28, Power) */}
        <g className="right-pins">
          <rect 
            x="257" 
            y="50" 
            width="8" 
            height="300" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 20 }, (_, i) => {
            const pinLabels = ['GP16', 'GP17', 'GND', 'GP18', 'GP19', 'GP20', 'GP21', 'GND', 'GP22', 'RUN', 'GP26', 'GP27', 'GND', 'GP28', 'ADC', '3V3', '3V3E', 'GND', 'VSYS', 'VBUS'];
            const pinLabel = pinLabels[i];
            const pinType = pinLabel.startsWith('GP') ? 'digital' : pinLabel === 'ADC' ? 'analog' : 'power';
            const pinNumber = pinLabel.startsWith('GP') ? pinLabel : pinLabel;
            const isConnected = isPinConnected(pinType, pinNumber);
            const isHovered = isPinHovered(pinType, pinNumber);
            const isSelected = isPinSelected(pinType, pinNumber);
            
            return (
              <g key={i}>
                <rect 
                  x={258} 
                  y={55 + i * 14} 
                  width="6" 
                  height="3" 
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
                  cx={261}
                  cy={56.5 + i * 14}
                  r="1.5"
                  className="pin-indicator"
                  fill={isSelected ? '#007bff' : isConnected ? '#28a745' : isHovered ? '#ffc107' : 'rgba(255, 255, 255, 0.8)'}
                  onClick={() => handlePinClick(pinType, pinNumber)}
                  onMouseEnter={() => handlePinHover(pinType, pinNumber)}
                  onMouseLeave={() => handlePinHover(null)}
                  style={{ cursor: 'pointer' }}
                />
                <text 
                  x={270} 
                  y={58 + i * 14} 
                  fontSize="6" 
                  fill="white" 
                  textAnchor="start"
                >
                  {pinLabel}
                </text>
              </g>
            );
          })}
        </g>
        
        {/* Debug Header (SWD) */}
        <g className="debug-header">
          <rect 
            x="140" 
            y="320" 
            width="20" 
            height="15" 
            fill="#1A1A1A" 
            stroke="#333333" 
            strokeWidth="1"
          />
          {Array.from({ length: 3 }, (_, i) => (
            <circle 
              key={i}
              cx={145 + i * 5} 
              cy={327.5} 
              r="1.5" 
              fill="#FFD700"
            />
          ))}
          <text x="150" y="315" fontSize="6" fill="white" textAnchor="middle">DEBUG</text>
        </g>
        
        {/* Temperature Sensor */}
        <rect 
          x="200" 
          y="250" 
          width="20" 
          height="15" 
          rx="2" 
          ry="2" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="210" y="245" fontSize="5" fill="white" textAnchor="middle">TEMP</text>
        
        {/* Voltage Regulator */}
        <rect 
          x="70" 
          y="250" 
          width="25" 
          height="20" 
          rx="2" 
          ry="2" 
          fill="#424242" 
          stroke="#212121" 
          strokeWidth="1"
        />
        <text x="82.5" y="262" fontSize="6" fill="white" textAnchor="middle">3.3V</text>
        <text x="82.5" y="270" fontSize="5" fill="#90A4AE" textAnchor="middle">REG</text>
        
        {/* Capacitors */}
        <circle cx="60" cy="200" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="70" cy="200" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="230" cy="200" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        <circle cx="240" cy="200" r="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
        
        {/* ADC Reference */}
        <rect 
          x="200" 
          y="280" 
          width="20" 
          height="12" 
          rx="2" 
          ry="2" 
          fill="#795548" 
          stroke="#5D4037" 
          strokeWidth="1"
        />
        <text x="210" y="275" fontSize="5" fill="white" textAnchor="middle">ADC REF</text>
        
        {/* Board Labels */}
        <text x="50" y="370" fontSize="10" fill="white" fontWeight="bold">Raspberry Pi Pico</text>
        <text x="220" y="370" fontSize="8" fill="white">RP2040</text>
        
        {/* Raspberry Pi Logo Area */}
        <rect 
          x="140" 
          y="100" 
          width="50" 
          height="25" 
          rx="3" 
          ry="3" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <circle cx="155" cy="112.5" r="6" fill="#C8102E"/>
        <circle cx="175" cy="112.5" r="6" fill="#C8102E"/>
        <text x="165" y="117" fontSize="6" fill="#C8102E" textAnchor="middle" fontWeight="bold">Pi</text>
        
        {/* Pin 1 Indicator */}
        <rect 
          x="32" 
          y="52" 
          width="4" 
          height="4" 
          fill="#FFFFFF" 
          stroke="#CCCCCC" 
          strokeWidth="1"
        />
        <text x="25" y="50" fontSize="5" fill="white">1</text>
        
        {/* Castellated Edges Indication */}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <circle cx={20} cy={60 + i * 28} r="3" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
            <circle cx={280} cy={60 + i * 28} r="3" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
          </g>
        ))}
      </svg>
      
      {/* Pin Tooltips */}
      <div className="pin-tooltips">
        {board.pins.digital.map((pin, index) => (
          <div 
            key={pin.id}
            className="pin-tooltip digital"
            style={{
              position: 'absolute',
              left: index < 20 ? '36px' : '258px',
              top: `${55 + (index % 20) * 14}px`,
              width: '6px',
              height: '3px'
            }}
            title={`Pin ${pin.label} - ${pin.type}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PiPico;