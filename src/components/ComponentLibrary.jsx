import React, { useState } from 'react';

const ComponentLibrary = ({ componentTypes, selectedBoard, isComponentCompatible, onDragStart, onComponentSelect, selectedComponent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const componentCategories = {
    basic: 'Basic Components',
    sensors: 'Sensors',
    actuators: 'Actuators',
    communication: 'Communication',
    power: 'Power & Control',
    display: 'Display & Output'
  };

  // Convert componentTypes object to array format for filtering
  const components = Object.entries(componentTypes).map(([id, component]) => ({
    id,
    name: component.name,
    category: getCategoryFromType(id),
    description: getDescriptionFromType(id),
    pins: component.pins.length,
    compatibleBoards: component.compatibleBoards,
    voltage: component.voltage
  }));

  function getCategoryFromType(type) {
    const categoryMap = {
      led: 'basic', resistor: 'basic', button: 'basic', potentiometer: 'basic', breadboard: 'basic',
      ultrasonic: 'sensors', bluetooth: 'communication', wifi: 'communication',
      servo: 'actuators'
    };
    return categoryMap[type] || 'basic';
  }

  function getDescriptionFromType(type) {
    const descMap = {
      led: 'Light Emitting Diode',
      resistor: 'Current limiting resistor', 
      button: 'Momentary switch',
      potentiometer: 'Variable resistor',
      servo: 'Precision motor control',
      ultrasonic: 'Distance measurement',
      bluetooth: 'HC-05 wireless comm',
      wifi: 'WiFi wireless module',
      breadboard: 'Prototyping board'
    };
    return descMap[type] || 'Electronic component';
  }

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ComponentIcon = ({ component }) => {
    const iconProps = {
      width: "40",
      height: "40",
      viewBox: "0 0 40 40",
      className: "component-icon"
    };

    switch (component.id) {
      case 'led':
        return (
          <svg {...iconProps}>
            <circle cx="20" cy="20" r="8" fill="#FF5722" stroke="#D84315" strokeWidth="2"/>
            <path d="M12 12 L28 28 M28 12 L12 28" stroke="#FFD700" strokeWidth="1"/>
            <line x1="20" y1="8" x2="20" y2="4" stroke="#333" strokeWidth="2"/>
            <line x1="20" y1="32" x2="20" y2="36" stroke="#333" strokeWidth="2"/>
          </svg>
        );
      
      case 'resistor':
        return (
          <svg {...iconProps}>
            <rect x="8" y="16" width="24" height="8" rx="2" fill="#8D6E63" stroke="#5D4037" strokeWidth="1"/>
            <rect x="10" y="17" width="2" height="6" fill="#FF5722"/>
            <rect x="14" y="17" width="2" height="6" fill="#FFD700"/>
            <rect x="18" y="17" width="2" height="6" fill="#4CAF50"/>
            <rect x="22" y="17" width="2" height="6" fill="#2196F3"/>
            <line x1="4" y1="20" x2="8" y2="20" stroke="#333" strokeWidth="2"/>
            <line x1="32" y1="20" x2="36" y2="20" stroke="#333" strokeWidth="2"/>
          </svg>
        );
      
      case 'button':
        return (
          <svg {...iconProps}>
            <rect x="8" y="12" width="24" height="16" rx="2" fill="#607D8B" stroke="#455A64" strokeWidth="1"/>
            <circle cx="20" cy="20" r="6" fill="#FF5722" stroke="#D84315" strokeWidth="1"/>
            <line x1="4" y1="20" x2="8" y2="20" stroke="#333" strokeWidth="2"/>
            <line x1="32" y1="20" x2="36" y2="20" stroke="#333" strokeWidth="2"/>
          </svg>
        );
      
      case 'potentiometer':
        return (
          <svg {...iconProps}>
            <rect x="6" y="16" width="28" height="8" rx="4" fill="#795548" stroke="#5D4037" strokeWidth="1"/>
            <circle cx="20" cy="12" r="3" fill="#FFD700" stroke="#FFA000" strokeWidth="1"/>
            <line x1="20" y1="9" x2="20" y2="4" stroke="#333" strokeWidth="2"/>
            <line x1="4" y1="20" x2="6" y2="20" stroke="#333" strokeWidth="2"/>
            <line x1="34" y1="20" x2="36" y2="20" stroke="#333" strokeWidth="2"/>
            <line x1="20" y1="24" x2="20" y2="36" stroke="#333" strokeWidth="2"/>
          </svg>
        );
      
      case 'servo':
        return (
          <svg {...iconProps}>
            <rect x="8" y="12" width="24" height="16" rx="2" fill="#2196F3" stroke="#1976D2" strokeWidth="1"/>
            <circle cx="20" cy="20" r="4" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1"/>
            <line x1="20" y1="16" x2="20" y2="12" stroke="#FF5722" strokeWidth="2"/>
            <text x="20" y="35" fontSize="6" fill="#333" textAnchor="middle">SERVO</text>
          </svg>
        );
      
      case 'ultrasonic':
        return (
          <svg {...iconProps}>
            <rect x="6" y="14" width="28" height="12" rx="2" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
            <circle cx="14" cy="20" r="3" fill="#263238" stroke="#37474F" strokeWidth="1"/>
            <circle cx="26" cy="20" r="3" fill="#263238" stroke="#37474F" strokeWidth="1"/>
            <text x="20" y="35" fontSize="5" fill="#333" textAnchor="middle">HC-SR04</text>
          </svg>
        );
      
      case 'bluetooth':
        return (
          <svg {...iconProps}>
            <rect x="8" y="10" width="24" height="20" rx="2" fill="#3F51B5" stroke="#303F9F" strokeWidth="1"/>
            <path d="M16 16 L24 12 L20 8 L24 4 L16 8 L16 16 L12 20 M16 16 L12 12" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
            <text x="20" y="35" fontSize="5" fill="#333" textAnchor="middle">HC-05</text>
          </svg>
        );
      
      case 'breadboard':
        return (
          <svg {...iconProps}>
            <rect x="4" y="8" width="32" height="24" rx="2" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1"/>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <circle cx={8 + i * 4} cy={14} r="1" fill="#333"/>
                <circle cx={8 + i * 4} cy={18} r="1" fill="#333"/>
                <circle cx={8 + i * 4} cy={22} r="1" fill="#333"/>
                <circle cx={8 + i * 4} cy={26} r="1" fill="#333"/>
              </g>
            ))}
          </svg>
        );
      
      default:
        return (
          <svg {...iconProps}>
            <rect x="8" y="8" width="24" height="24" rx="4" fill="#9E9E9E" stroke="#757575" strokeWidth="1"/>
            <text x="20" y="22" fontSize="8" fill="white" textAnchor="middle">?</text>
          </svg>
        );
    }
  };

  const handleDragStart = (e, component) => {
    const isCompatible = isComponentCompatible(component.id);
    if (!isCompatible) {
      e.preventDefault();
      return;
    }
    onDragStart(component.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="component-library">
      <div className="library-header">
        <div className="library-title">
          <span className="library-icon">🧩</span>
          Component Library
        </div>
        
        <div className="library-controls">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All ({components.length})
            </button>
            {Object.entries(componentCategories).map(([key, name]) => {
              const count = components.filter(c => c.category === key).length;
              return (
                <button
                  key={key}
                  className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {name.split(' ')[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Components Grid */}
      <div className="components-grid">
        {filteredComponents.map(component => {
          const isCompatible = isComponentCompatible(component.id);
          
          return (
            <div
              key={component.id}
              className={`component-item ${
                selectedComponent?.id === component.id ? 'selected' : ''
              } ${!isCompatible ? 'disabled' : ''}`}
              draggable={isCompatible}
              onDragStart={(e) => handleDragStart(e, component)}
              onClick={() => onComponentSelect && onComponentSelect(component)}
              title={!isCompatible ? `Not compatible with selected board` : component.description}
            >
              <div className="component-icon-container">
                <ComponentIcon component={component} />
              </div>
              <div className="component-info">
                <div className="component-name">{component.name}</div>
                <div className="component-pins">{component.pins} pins</div>
                {component.voltage && (
                  <div className="component-voltage">{component.voltage}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredComponents.length === 0 && (
        <div className="no-components">
          <p>No components found matching your search.</p>
        </div>
      )}
      
      {/* Component Details */}
      {selectedComponent && (
        <div className="component-details">
          <h4>{selectedComponent.name}</h4>
          <p>{selectedComponent.description}</p>
          <div className="component-specs">
            <span className="spec-item">Pins: {selectedComponent.pins}</span>
            <span className="spec-item">Category: {componentCategories[selectedComponent.category]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentLibrary;