import React, { useState, useRef, useEffect } from 'react';
import './ArduinoPlayground.css';

const ArduinoPlayground = ({ onComplete }) => {
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [code, setCode] = useState(`// Arduino Playground Code\nvoid setup() {\n  // Initialize your components here\n}\n\nvoid loop() {\n  // Main program loop\n}`);
  const [isRunning, setIsRunning] = useState(false);
  const [serialOutput, setSerialOutput] = useState([]);
  const [pinStates, setPinStates] = useState({});
  
  const playgroundRef = useRef(null);
  const nextComponentId = useRef(1);
  
  // Available components library organized by categories
  const componentCategories = {
    'Basic Components': {
      icon: '🔧',
      components: [
        {
          type: 'led',
          name: 'LED',
          icon: '/src/assets/led-red.svg',
          colors: ['red', 'green', 'blue'],
          pins: ['anode', 'cathode']
        },
        {
          type: 'resistor',
          name: 'Resistor',
          icon: '/src/assets/resistor.svg',
          values: ['220Ω', '1kΩ', '10kΩ'],
          pins: ['pin1', 'pin2']
        },
        {
          type: 'buzzer',
          name: 'Buzzer',
          icon: '/src/assets/buzzer.svg',
          pins: ['+', '-']
        }
      ]
    },
    'Sensors': {
      icon: '📡',
      components: [
        {
          type: 'ultrasonic',
          name: 'Ultrasonic Sensor',
          icon: '/src/assets/ultrasonic-sensor.svg',
          pins: ['VCC', 'TRIG', 'ECHO', 'GND']
        },
        {
          type: 'temperature',
          name: 'Temperature Sensor',
          icon: '/src/assets/temperature-sensor.svg',
          pins: ['VCC', 'DATA', 'GND']
        }
      ]
    },
    'Actuators': {
      icon: '⚙️',
      components: [
        {
          type: 'servo',
          name: 'Servo Motor',
          icon: '/src/assets/servo-motor.svg',
          pins: ['VCC', 'SIGNAL', 'GND']
        }
      ]
    }
  };

  // Component library state
  const [selectedCategory, setSelectedCategory] = useState('Basic Components');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter components based on search
  const getFilteredComponents = () => {
    if (!searchTerm) return componentCategories[selectedCategory]?.components || [];
    
    return Object.values(componentCategories)
      .flatMap(category => category.components)
      .filter(component => 
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  // Drag and drop handlers
  const handleDragStart = (component) => {
    setDraggedComponent(component);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedComponent) return;
    
    const rect = playgroundRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    // Ensure components are visible within bounds
    const boundedX = Math.max(20, Math.min(x, rect.width / zoom - 100));
    const boundedY = Math.max(20, Math.min(y, rect.height / zoom - 100));
    
    const newComponent = {
      id: `component-${nextComponentId.current++}`,
      ...draggedComponent,
      x: boundedX,
      y: boundedY,
      rotation: 0,
      connections: {}
    };
    
    setComponents(prev => [...prev, newComponent]);
    setDraggedComponent(null);
  };

  // Component selection and manipulation
  const handleComponentClick = (componentId) => {
    setSelectedComponent(componentId);
  };

  const deleteSelectedComponent = () => {
    if (selectedComponent) {
      setComponents(prev => prev.filter(c => c.id !== selectedComponent));
      setConnections(prev => prev.filter(c => 
        c.from.componentId !== selectedComponent && c.to.componentId !== selectedComponent
      ));
      setSelectedComponent(null);
    }
  };

  // Connection handling
  const startConnection = (componentId, pinIndex) => {
    if (isConnecting && connectionStart) {
      // Complete connection
      if (connectionStart.componentId !== componentId) {
        const newConnection = {
          id: `connection-${Date.now()}`,
          from: connectionStart,
          to: { componentId, pinIndex }
        };
        setConnections(prev => [...prev, newConnection]);
      }
      setIsConnecting(false);
      setConnectionStart(null);
    } else {
      // Start connection
      setIsConnecting(true);
      setConnectionStart({ componentId, pinIndex });
    }
  };

  // Zoom controls
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  // Code execution simulation
  const runCode = () => {
    setIsRunning(true);
    setSerialOutput(prev => [...prev, 'Starting simulation...']);
    
    // Simulate some output
    setTimeout(() => {
      setSerialOutput(prev => [...prev, 'Setup complete']);
      setSerialOutput(prev => [...prev, 'Loop started']);
    }, 1000);
    
    setTimeout(() => {
      setIsRunning(false);
      setSerialOutput(prev => [...prev, 'Simulation stopped']);
    }, 5000);
  };

  const stopCode = () => {
    setIsRunning(false);
    setSerialOutput(prev => [...prev, 'Simulation stopped by user']);
  };

  const clearSerial = () => {
    setSerialOutput([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedComponent) {
        deleteSelectedComponent();
      }
      if (e.key === 'Escape') {
        setSelectedComponent(null);
        setIsConnecting(false);
        setConnectionStart(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent]);

  return (
    <div className="arduino-playground">
      {/* Header */}
      <div className="playground-header">
        <h2>Arduino Playground</h2>
        <div className="header-controls">
          <button 
            className={`run-btn ${isRunning ? 'running' : ''}`}
            onClick={isRunning ? stopCode : runCode}
          >
            {isRunning ? '⏹️ Stop' : '▶️ Run'}
          </button>
          <button className="clear-btn" onClick={clearSerial}>
            🗑️ Clear
          </button>
        </div>
      </div>

      <div className="playground-content">
        {/* Component Library Sidebar */}
        <div className="component-library">
          <div className="library-header">
            <h3>Components</h3>
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Category Tabs */}
          <div className="category-tabs">
            {Object.keys(componentCategories).map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {componentCategories[category].icon} {category}
              </button>
            ))}
          </div>
          
          {/* Component Grid */}
          <div className="component-grid">
            {getFilteredComponents().map((component, index) => (
              <div
                key={`${component.type}-${index}`}
                className="component-item"
                draggable
                onDragStart={() => handleDragStart(component)}
              >
                <img src={component.icon} alt={component.name} className="component-icon" />
                <span className="component-name">{component.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Playground Area */}
        <div className="playground-main">
          <div className="playground-controls">
            <div className="zoom-controls">
              <button onClick={zoomOut}>🔍-</button>
              <span>{Math.round(zoom * 100)}%</span>
              <button onClick={zoomIn}>🔍+</button>
              <button onClick={resetZoom}>Reset</button>
            </div>
            
            <div className="connection-controls">
              <button 
                className={`connection-btn ${isConnecting ? 'active' : ''}`}
                onClick={() => {
                  setIsConnecting(!isConnecting);
                  setConnectionStart(null);
                }}
              >
                🔌 {isConnecting ? 'Cancel' : 'Connect'}
              </button>
            </div>
          </div>
          
          <div 
            ref={playgroundRef}
            className="playground-canvas"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Grid Background */}
            <div className="grid-background"></div>
            
            {/* Components */}
            {components.map(component => (
              <div
                key={component.id}
                className={`playground-component ${selectedComponent === component.id ? 'selected' : ''}`}
                style={{
                  left: component.x,
                  top: component.y,
                  transform: `rotate(${component.rotation}deg)`
                }}
                onClick={() => handleComponentClick(component.id)}
              >
                <img src={component.icon} alt={component.name} />
                <div className="component-label">{component.name}</div>
                
                {/* Connection Points */}
                {component.pins && component.pins.map((pin, index) => (
                  <div
                    key={index}
                    className={`connection-point ${connectionStart?.componentId === component.id && connectionStart?.pinIndex === index ? 'active' : ''}`}
                    style={{
                      left: `${(index + 1) * (100 / (component.pins.length + 1))}%`,
                      top: '100%'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isConnecting) {
                        startConnection(component.id, index);
                      }
                    }}
                    title={pin}
                  >
                    <div className="pin-label">{pin}</div>
                  </div>
                ))}
              </div>
            ))}
            
            {/* Connections */}
            <svg className="connections-overlay">
              {connections.map(connection => {
                const fromComponent = components.find(c => c.id === connection.from.componentId);
                const toComponent = components.find(c => c.id === connection.to.componentId);
                
                if (!fromComponent || !toComponent) return null;
                
                const fromX = fromComponent.x + (connection.from.pinIndex + 1) * (100 / (fromComponent.pins.length + 1));
                const fromY = fromComponent.y + 100;
                const toX = toComponent.x + (connection.to.pinIndex + 1) * (100 / (toComponent.pins.length + 1));
                const toY = toComponent.y + 100;
                
                return (
                  <line
                    key={connection.id}
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#007bff"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="code-panel">
          <div className="panel-header">
            <h3>Arduino Code</h3>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-editor"
            placeholder="Write your Arduino code here..."
          />
          
          {/* Serial Monitor */}
          <div className="serial-monitor">
            <div className="monitor-header">
              <h4>Serial Monitor</h4>
              <button onClick={clearSerial} className="clear-serial-btn">Clear</button>
            </div>
            <div className="serial-output">
              {serialOutput.map((line, index) => (
                <div key={index} className="serial-line">{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Component Properties Panel */}
      {selectedComponent && (
        <div className="properties-panel">
          <h3>Component Properties</h3>
          {(() => {
            const component = components.find(c => c.id === selectedComponent);
            if (!component) return null;
            
            return (
              <div className="property-controls">
                <div className="property-group">
                  <label>Name:</label>
                  <input 
                    type="text" 
                    value={component.name} 
                    onChange={(e) => {
                      setComponents(prev => prev.map(c => 
                        c.id === selectedComponent 
                          ? { ...c, name: e.target.value }
                          : c
                      ));
                    }}
                  />
                </div>
                
                <div className="property-group">
                  <label>X Position:</label>
                  <input 
                    type="number" 
                    value={Math.round(component.x)} 
                    onChange={(e) => {
                      setComponents(prev => prev.map(c => 
                        c.id === selectedComponent 
                          ? { ...c, x: parseInt(e.target.value) }
                          : c
                      ));
                    }}
                  />
                </div>
                
                <div className="property-group">
                  <label>Y Position:</label>
                  <input 
                    type="number" 
                    value={Math.round(component.y)} 
                    onChange={(e) => {
                      setComponents(prev => prev.map(c => 
                        c.id === selectedComponent 
                          ? { ...c, y: parseInt(e.target.value) }
                          : c
                      ));
                    }}
                  />
                </div>
                
                <div className="property-group">
                  <label>Rotation:</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={component.rotation || 0} 
                    onChange={(e) => {
                      setComponents(prev => prev.map(c => 
                        c.id === selectedComponent 
                          ? { ...c, rotation: parseInt(e.target.value) }
                          : c
                      ));
                    }}
                  />
                  <span>{component.rotation || 0}°</span>
                </div>
                
                <button 
                  className="delete-component-btn"
                  onClick={deleteSelectedComponent}
                >
                  🗑️ Delete Component
                </button>
              </div>
            );
          })()} 
        </div>
      )}
    </div>
  );
};

export default ArduinoPlayground;