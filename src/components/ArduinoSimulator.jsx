import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ArduinoSimulator.css';
import './CircuitoStyles.css';
import CodeEditor from './CodeEditor';
import SerialMonitor from './SerialMonitor';

/* LED Active State */
const ledActiveStyles = `
.led-active {
  filter: drop-shadow(0 0 10px #ff4444) brightness(1.5);
  animation: ledPulse 1s infinite alternate;
}

@keyframes ledPulse {
  0% { filter: drop-shadow(0 0 10px #ff4444) brightness(1.5); }
  100% { filter: drop-shadow(0 0 20px #ff6666) brightness(2); }
}

/* Pin Connection Indicators */
.pin-indicator {
  transition: all 0.2s ease;
}

.pin-indicator.hovered {
  transform: translate(-50%, -50%) scale(1.2);
}

.pin-indicator.compatible {
  animation: pinPulse 1s infinite;
}

@keyframes pinPulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

/* Fullscreen IDE */
.code-panel.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: #1e1e1e;
}

.code-panel.fullscreen .panel-header {
  background: #2d2d2d;
  padding: 15px 20px;
}

.code-panel.fullscreen .code-textarea {
  height: calc(100vh - 120px);
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = ledActiveStyles;
  document.head.appendChild(styleElement);
}

// Import realistic component images
import arduinoBoard from '../assets/components/arduino-uno-realistic.svg';
import breadboard from '../assets/components/breadboard-realistic.svg';
import breadboardFull from '../assets/components/breadboard-full.svg';
import ledRealistic from '../assets/components/led-realistic.svg';
import ledAnimated from '../assets/components/led-animated.svg';
import resistor from '../assets/components/resistor-realistic.svg';
import buzzer from '../assets/components/buzzer-realistic.svg';
import buzzerAnimated from '../assets/components/buzzer-animated.svg';
import potentiometer from '../assets/components/potentiometer-realistic.svg';
import temperatureSensor from '../assets/components/temperature-sensor-realistic.svg';
import ultrasonicSensor from '../assets/components/ultrasonic-sensor-realistic.svg';
import photoresistor from '../assets/components/photoresistor-realistic.svg';
import servoMotor from '../assets/components/servo-motor-realistic.svg';
import servoAnimated from '../assets/components/servo-motor-animated.svg';
import pirSensor from '../assets/components/pir-sensor-realistic.svg';
import lcdDisplay from '../assets/components/lcd-16x2-realistic.svg';
import lcdAnimated from '../assets/components/lcd-display-animated.svg';
import oledDisplay from '../assets/components/oled-display-realistic.svg';
import capacitor from '../assets/components/capacitor-realistic.svg';
import pushButton from '../assets/components/push-button-realistic.svg';

// Component Library - Circuito.io Style
const COMPONENT_CATEGORIES = {
  'Arduino Boards': {
    icon: '🔧',
    color: '#2196F3',
    components: [
      {
        id: 'arduino-uno',
        name: 'Arduino Uno R3',
        image: arduinoBoard,
        description: 'The classic Arduino board with 14 digital pins and 6 analog inputs',
        pins: ['D0-D13', 'A0-A5', '5V', '3.3V', 'GND'],
        voltage: '5V',
        price: '$25',
        pinPositions: [
          { name: 'D13', position: { x: 285, y: 45 }, type: 'digital' },
          { name: 'D12', position: { x: 285, y: 55 }, type: 'digital' },
          { name: 'D11', position: { x: 285, y: 65 }, type: 'digital' },
          { name: 'D10', position: { x: 285, y: 75 }, type: 'digital' },
          { name: 'D9', position: { x: 285, y: 85 }, type: 'digital' },
          { name: 'D8', position: { x: 285, y: 95 }, type: 'digital' },
          { name: 'D7', position: { x: 285, y: 105 }, type: 'digital' },
          { name: 'D6', position: { x: 285, y: 115 }, type: 'digital' },
          { name: 'D5', position: { x: 285, y: 125 }, type: 'digital' },
          { name: 'D4', position: { x: 285, y: 135 }, type: 'digital' },
          { name: 'D3', position: { x: 285, y: 145 }, type: 'digital' },
          { name: 'D2', position: { x: 285, y: 155 }, type: 'digital' },
          { name: 'GND', position: { x: 285, y: 165 }, type: 'ground' },
          { name: '5V', position: { x: 285, y: 175 }, type: 'power' },
          { name: 'A0', position: { x: 15, y: 175 }, type: 'analog' },
          { name: 'A1', position: { x: 15, y: 165 }, type: 'analog' },
          { name: 'A2', position: { x: 15, y: 155 }, type: 'analog' },
          { name: 'A3', position: { x: 15, y: 145 }, type: 'analog' },
          { name: 'A4', position: { x: 15, y: 135 }, type: 'analog' },
          { name: 'A5', position: { x: 15, y: 125 }, type: 'analog' }
        ]
      }
    ]
  },
  'Input Sensors': {
    icon: '📡',
    color: '#4CAF50',
    components: [
      {
        id: 'temperature-sensor',
        name: 'Temperature Sensor (DS18B20)',
        image: temperatureSensor,
        description: 'Digital temperature sensor with 1-wire interface',
        pins: ['VCC', 'Data', 'GND'],
        voltage: '3.3V-5V',
        price: '$3'
      },
      {
        id: 'ultrasonic-sensor',
        name: 'Ultrasonic Sensor (HC-SR04)',
        image: ultrasonicSensor,
        description: 'Distance measurement sensor using ultrasonic waves',
        pins: ['VCC', 'Trig', 'Echo', 'GND'],
        voltage: '5V',
        price: '$2'
      },
      {
        id: 'photoresistor',
        name: 'Light Sensor (LDR)',
        image: photoresistor,
        description: 'Light-dependent resistor for ambient light detection',
        pins: ['Pin1', 'Pin2'],
        voltage: '3.3V-5V',
        price: '$1'
      },
      {
        id: 'potentiometer',
        name: 'Potentiometer',
        image: potentiometer,
        description: 'Variable resistor for analog input control',
        pins: ['VCC', 'Wiper', 'GND'],
        voltage: '3.3V-5V',
        price: '$1'
      },
      {
        id: 'push-button',
        name: 'Push Button',
        image: pushButton,
        description: 'Momentary tactile switch for user input',
        pins: ['Pin1', 'Pin2'],
        voltage: '3.3V-5V',
        price: '$0.50',
        asset: '/src/assets/components/push-button-detailed.svg',
        pinPositions: [
          { name: 'Pin 1', position: { x: 12, y: 12 }, type: 'input' },
          { name: 'Pin 2', position: { x: 48, y: 12 }, type: 'input' },
          { name: 'Pin 3', position: { x: 12, y: 48 }, type: 'input' },
          { name: 'Pin 4', position: { x: 48, y: 48 }, type: 'input' }
        ],
        compatiblePins: ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'GND', '5V']
      }
    ]
  },
  'Output Actuators': {
    icon: '💡',
    color: '#FF9800',
    components: [
      {
        id: 'led-red',
        name: 'Red LED',
        image: ledRealistic,
        animatedImage: ledAnimated,
        description: 'Light-emitting diode in red color',
        pins: ['Anode', 'Cathode'],
        voltage: '2V-3.3V',
        price: '$0.25',
        asset: '/src/assets/components/led-detailed.svg',
        pinPositions: [
          { name: 'Anode (+)', position: { x: 36.5, y: 73 }, type: 'positive' },
          { name: 'Cathode (-)', position: { x: 23.5, y: 68 }, type: 'negative' }
        ],
        compatiblePins: ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'GND']
      },
      {
        id: 'buzzer',
        name: 'Active Buzzer',
        image: buzzer,
        animatedImage: buzzerAnimated,
        description: 'Sound generator for audio feedback',
        pins: ['Positive', 'Negative'],
        voltage: '3.3V-5V',
        price: '$1'
      },
      {
        id: 'servo-motor',
        name: 'Servo Motor (SG90)',
        image: servoMotor,
        animatedImage: servoAnimated,
        description: 'Precision motor with position control',
        pins: ['VCC', 'Signal', 'GND'],
        voltage: '4.8V-6V',
        price: '$3'
      }
    ]
  },
  'Displays': {
    icon: '📺',
    color: '#9C27B0',
    components: [
      {
        id: 'lcd-16x2',
        name: 'LCD 16x2 Display',
        image: lcdDisplay,
        animatedImage: lcdAnimated,
        description: '16x2 character liquid crystal display',
        pins: ['VSS', 'VDD', 'V0', 'RS', 'Enable', 'D4-D7', 'A', 'K'],
        voltage: '5V',
        price: '$4'
      },
      {
        id: 'oled-128x64',
        name: 'OLED 128x64 Display',
        image: oledDisplay,
        description: 'High-contrast OLED display with I2C interface',
        pins: ['VCC', 'GND', 'SCL', 'SDA'],
        voltage: '3.3V-5V',
        price: '$6'
      }
    ]
  },
  'Passive Components': {
    icon: '🔋',
    color: '#607D8B',
    components: [
      {
        id: 'resistor',
        name: 'Resistor (220Ω)',
        image: resistor,
        description: 'Current limiting and voltage dividing component',
        pins: ['Pin1', 'Pin2'],
        voltage: 'Any',
        price: '$0.10',
        asset: '/src/assets/components/resistor-detailed.svg',
        pinPositions: [
          { name: 'Terminal 1', position: { x: 12.5, y: 20 }, type: 'neutral' },
          { name: 'Terminal 2', position: { x: 67.5, y: 20 }, type: 'neutral' }
        ],
        compatiblePins: ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', '5V', '3.3V', 'GND']
      },
      {
        id: 'capacitor',
        name: 'Capacitor',
        image: capacitor,
        description: 'Energy storage and filtering component',
        pins: ['Positive', 'Negative'],
        voltage: 'Rated',
        price: '$0.25'
      },
      {
        id: 'breadboard',
        name: 'Breadboard',
        image: breadboard,
        fullImage: breadboardFull,
        description: 'Solderless prototyping board',
        pins: [],
        voltage: 'Any',
        price: '$5'
      }
    ]
  }
};

const ArduinoSimulator = ({ onBack }) => {
  // Core state
  const [projectName, setProjectName] = useState('My Arduino Project');
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasBreadboard, setHasBreadboard] = useState(false);
  const [wiring, setWiring] = useState([]);
  
  // UI state
  const [activeCategory, setActiveCategory] = useState('Arduino Boards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [showWiring, setShowWiring] = useState(false);
  const [isIDEFullscreen, setIsIDEFullscreen] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // Workspace state
  const [workspaceZoom, setWorkspaceZoom] = useState(1);
  const [workspaceOffset, setWorkspaceOffset] = useState({ x: 0, y: 0 });
  const [hoveredPin, setHoveredPin] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const workspaceRef = useRef(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Helper functions for component assets and sizing
  const getComponentAsset = (component) => {
    const assetMap = {
      'arduino-uno': '/src/assets/components/arduino-uno-detailed.svg',
      'led': '/src/assets/components/led-detailed.svg',
      'resistor': '/src/assets/components/resistor-detailed.svg',
      'button': '/src/assets/components/push-button-detailed.svg'
    };
    return assetMap[component.type] || component.image;
  };

  const getComponentSize = (type) => {
    const sizeMap = {
      'arduino-uno': { width: '400px', height: '280px' },
      'led': { width: '60px', height: '80px' },
      'resistor': { width: '80px', height: '40px' },
      'button': { width: '60px', height: '60px' }
    };
    return sizeMap[type] || { width: '60px', height: '60px' }
   };

   // Handle code execution
   const handleRunCode = () => {
     setIsRunning(true);
     setCodeOutput('Compiling code...\n');
     
     setTimeout(() => {
       setCodeOutput(prev => prev + 'Upload complete.\n');
       
       // Simulate code effects on components
       setTimeout(() => {
         setCodeOutput(prev => prev + 'Running program...\n');
         
         // Analyze code for LED control
         if (code.includes('digitalWrite') && code.includes('HIGH')) {
           setCodeOutput(prev => prev + 'LED turned ON\n');
           // Add visual effect to LEDs
           const ledComponents = placedComponents.filter(comp => comp.type === 'led');
           ledComponents.forEach(led => {
             // Add glow effect class
             const element = document.querySelector(`[data-component-id="${led.id}"]`);
             if (element) {
               element.classList.add('led-active');
             }
           });
         }
         
         if (code.includes('digitalRead')) {
           setCodeOutput(prev => prev + 'Reading button state...\n');
         }
         
         if (code.includes('analogRead')) {
           setCodeOutput(prev => prev + 'Reading analog sensor...\n');
         }
         
         setCodeOutput(prev => prev + 'Program running successfully!\n');
         setIsRunning(false);
       }, 1000);
     }, 1500);
   };

  // Code state
  const [code, setCode] = useState(`// Arduino Code\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}`);
  
  // Zoom functionality
  const handleWheel = useCallback((e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setWorkspaceZoom(prev => Math.max(0.1, Math.min(3, prev * zoomFactor)));
    }
  }, []);
  
  useEffect(() => {
    const workspace = workspaceRef.current;
    if (workspace) {
      workspace.addEventListener('wheel', handleWheel, { passive: false });
      return () => workspace.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);
  
  // Get filtered components based on search and category
  const getFilteredComponents = () => {
    const categoryComponents = COMPONENT_CATEGORIES[activeCategory]?.components || [];
    if (!searchTerm) return categoryComponents;
    
    return categoryComponents.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Add component to workspace
  const addComponent = (componentData) => {
    const newComponent = {
      id: `${componentData.id}-${Date.now()}`,
      type: componentData.id,
      name: componentData.name,
      image: isSimulating && componentData.animatedImage ? componentData.animatedImage : componentData.image,
      staticImage: componentData.image,
      animatedImage: componentData.animatedImage,
      position: {
        x: 300 + Math.random() * 200,
        y: 200 + Math.random() * 200
      },
      rotation: 0,
      properties: { ...componentData },
      isActive: false
    };
    
    // Auto-add breadboard if more than one component (excluding Arduino board)
    const nonBoardComponents = components.filter(c => c.type !== 'arduino-uno' && c.type !== 'breadboard');
    if (nonBoardComponents.length >= 1 && componentData.id !== 'breadboard' && componentData.id !== 'arduino-uno' && !hasBreadboard) {
      const breadboardComponent = {
        id: `breadboard-${Date.now()}`,
        type: 'breadboard',
        name: 'Breadboard',
        image: breadboardFull,
        staticImage: breadboard,
        position: { x: 150, y: 300 },
        rotation: 0,
        properties: COMPONENT_CATEGORIES['Passive Components'].components.find(c => c.id === 'breadboard'),
        isActive: false
      };
      setComponents(prev => [...prev, breadboardComponent, newComponent]);
      setHasBreadboard(true);
    } else {
      setComponents(prev => [...prev, newComponent]);
      if (componentData.id === 'breadboard') {
        setHasBreadboard(true);
      }
    }
    
    // Show wiring connections when component is added
    if (componentData.pins && componentData.pins.length > 0) {
      setShowWiring(true);
    }
  };
  
  // Handle component selection
  const handleComponentClick = (componentId) => {
    const newSelection = selectedComponent === componentId ? null : componentId;
    setSelectedComponent(newSelection);
    setShowProperties(newSelection !== null);
    
    // Clear hovered pin when selection changes
    if (newSelection !== selectedComponent) {
      setHoveredPin(null);
    }
  };

  const handlePinConnection = (pin, boardId) => {
    if (selectedComponent && selectedComponent !== boardId) {
      // Create a connection between the selected component and the pin
      const newConnection = {
        id: Date.now(),
        componentId: selectedComponent,
        boardId: boardId,
        pin: pin.name,
        position: pin.position
      };
      setConnections(prev => [...prev, newConnection]);
      setSelectedComponent(null);
      setHoveredPin(null);
    }
  };
  
  // Delete selected component
  const deleteComponent = () => {
    if (selectedComponent) {
      const componentToDelete = components.find(c => c.id === selectedComponent);
      setComponents(prev => prev.filter(c => c.id !== selectedComponent));
      
      // Remove breadboard if it was the last non-board component
      if (componentToDelete && componentToDelete.type !== 'arduino-uno' && componentToDelete.type !== 'breadboard') {
        const remainingNonBoardComponents = components.filter(c => 
          c.id !== selectedComponent && c.type !== 'arduino-uno' && c.type !== 'breadboard'
        );
        if (remainingNonBoardComponents.length === 0 && hasBreadboard) {
          setComponents(prev => prev.filter(c => c.type !== 'breadboard'));
          setHasBreadboard(false);
        }
      }
      
      if (componentToDelete && componentToDelete.type === 'breadboard') {
        setHasBreadboard(false);
      }
      
      setSelectedComponent(null);
      setShowProperties(false);
    }
  };
  
  // Toggle simulation and component animations
  const toggleSimulation = () => {
    setIsSimulating(prev => {
      const newSimulating = !prev;
      // Update component images based on simulation state
      setComponents(prevComponents => 
        prevComponents.map(component => ({
          ...component,
          image: newSimulating && component.animatedImage 
            ? component.animatedImage 
            : component.staticImage || component.image
        }))
      );
      return newSimulating;
    });
  };
  
  // Simulation controls
  const startSimulation = () => {
    setIsSimulating(true);
  };
  
  const stopSimulation = () => {
    setIsSimulating(false);
  };
  
  const resetSimulation = () => {
    setIsSimulating(false);
    setComponents(prev => 
      prev.map(component => ({
        ...component,
        image: component.staticImage || component.image
      }))
    );
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedComponent) {
        deleteComponent();
      }
      if (e.key === 'Escape') {
        setSelectedComponent(null);
        setShowProperties(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent]);
  
  return (
    <div className="circuito-simulator arduino-simulator">
      {/* Header */}
      <header className="circuito-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Arduino Simulator</span>
          </div>
          <div className="project-info">
            <input 
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)}
              className="project-name-input"
            />
            <span className="project-status">
              {isSimulating ? '🟢 Simulating' : '⚪ Ready'}
            </span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="simulation-controls">
            <button 
              className={`sim-btn ${isSimulating ? 'stop' : 'start'}`}
              onClick={toggleSimulation}
            >
              {isSimulating ? '⏹️ Stop' : '▶️ Run'}
            </button>
            <button className="sim-btn reset">
              🔄 Reset
            </button>
            <button 
              className={`sim-btn ${showWiring ? 'active' : ''}`}
              onClick={() => setShowWiring(!showWiring)}
            >
              🔌 Wiring
            </button>
          </div>
        </div>
        
        <div className="header-right">
          <button 
            className={`header-btn ${showCodeEditor ? 'active' : ''}`}
            onClick={() => {
              if (showCodeEditor && !isIDEFullscreen) {
                setIsIDEFullscreen(true);
              } else if (showCodeEditor && isIDEFullscreen) {
                setShowCodeEditor(false);
                setIsIDEFullscreen(false);
              } else {
                setShowCodeEditor(true);
                setIsIDEFullscreen(false);
              }
            }}
          >
            💻 {isIDEFullscreen ? 'Exit Fullscreen' : showCodeEditor ? 'Fullscreen' : 'IDE'}
          </button>
          <button className="header-btn" onClick={onBack}>
            ← Back
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="circuito-main">
        {/* Component Library Sidebar */}
        <aside className="component-library">
          <div className="library-header">
            <h3>Components</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="category-tabs">
            {Object.entries(COMPONENT_CATEGORIES).map(([category, data]) => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                style={{ borderLeftColor: data.color }}
              >
                <span className="category-icon">{data.icon}</span>
                <span className="category-name">{category}</span>
              </button>
            ))}
          </div>
          
          <div className="components-list">
            {getFilteredComponents().map((component) => (
              <div
                key={component.id}
                className="component-item"
                onClick={() => addComponent(component)}
              >
                <div className="component-image">
                  <img src={component.image} alt={component.name} />
                </div>
                <div className="component-info">
                  <div className="component-name">{component.name}</div>
                  <div className="component-description">{component.description}</div>
                  <div className="component-specs">
                    <span className="voltage">{component.voltage}</span>
                    <span className="price">{component.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
        
        {/* Workspace */}
        <main className="workspace" ref={workspaceRef}>
          <div 
            className="workspace-grid"
            style={{
              transform: `scale(${workspaceZoom}) translate(${workspaceOffset.x}px, ${workspaceOffset.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            {/* Grid pattern */}
            <svg className="grid-pattern" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Components */}
            {components.map((component) => (
              <div
                key={component.id}
                className={`workspace-component ${selectedComponent === component.id ? 'selected' : ''} ${isSimulating ? 'simulating' : ''}`}
                data-component-id={component.id}
                data-component-type={component.type}
                style={{
                  left: component.position.x,
                  top: component.position.y,
                  transform: `rotate(${component.rotation}deg)`,
                  width: component.type === 'arduino-uno' ? '400px' : 'auto',
                  height: component.type === 'arduino-uno' ? '280px' : 'auto'
                }}
                onClick={() => handleComponentClick(component.id)}
              >
                <img 
                   src={getComponentAsset(component)} 
                   alt={component.name}
                   style={{ 
                     width: getComponentSize(component.type).width, 
                     height: getComponentSize(component.type).height 
                   }}
                 />
                <div className="component-label">{component.name}</div>
                
                {/* Pin Connection Indicators for Arduino Board */}
                {component.type === 'arduino-uno' && selectedComponent && component.properties.pinPositions && component.properties.pinPositions.map(pin => {
                  const otherComponent = components.find(c => c.id === selectedComponent && c.id !== component.id);
                  const isCompatible = otherComponent?.properties.compatiblePins?.includes(pin.name);
                  return (
                    <div
                      key={pin.name}
                      className={`pin-indicator ${isCompatible ? 'compatible' : 'incompatible'} ${hoveredPin === pin.name ? 'hovered' : ''}`}
                      style={{
                        position: 'absolute',
                        left: pin.position.x,
                        top: pin.position.y,
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: `2px solid ${isCompatible ? '#00FF00' : '#FF0000'}`,
                        backgroundColor: isCompatible ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                      onMouseEnter={() => setHoveredPin(pin.name)}
                      onMouseLeave={() => setHoveredPin(null)}
                    >
                      {hoveredPin === pin.name && (
                        <div className="pin-tooltip" style={{
                          position: 'absolute',
                          bottom: '15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#333',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          whiteSpace: 'nowrap',
                          zIndex: 20
                        }}>
                          {pin.name}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {selectedComponent === component.id && (
                  <div className="selection-handles">
                    <div className="handle top-left"></div>
                    <div className="handle top-right"></div>
                    <div className="handle bottom-left"></div>
                    <div className="handle bottom-right"></div>
                    <button 
                      className="remove-component-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteComponent();
                      }}
                      title="Remove Component"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* Wiring Connections */}
            {showWiring && (
              <svg className="wiring-overlay" width="100%" height="100%">
                {components.map((component, index) => {
                  if (component.type === 'arduino-uno') return null;
                  const arduinoBoard = components.find(c => c.type === 'arduino-uno');
                  if (!arduinoBoard) return null;
                  
                  const startX = component.position.x + 40;
                  const startY = component.position.y + 30;
                  const endX = arduinoBoard.position.x + 60;
                  const endY = arduinoBoard.position.y + 40;
                  
                  return (
                    <g key={`wire-${component.id}`}>
                      <path
                        d={`M ${startX} ${startY} Q ${(startX + endX) / 2} ${startY - 50} ${endX} ${endY}`}
                        stroke={component.type === 'led-red' ? '#ff4444' : component.type === 'buzzer' ? '#ffa500' : '#666'}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={isSimulating ? '5,5' : 'none'}
                        className={isSimulating ? 'wire-animated' : ''}
                      />
                      <circle cx={startX} cy={startY} r="3" fill="#ffd700" />
                      <circle cx={endX} cy={endY} r="3" fill="#ffd700" />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
          
          {/* Workspace Tools */}
          <div className="workspace-tools">
            <button className="tool-btn" title="Zoom In">
              🔍+
            </button>
            <button className="tool-btn" title="Zoom Out">
              🔍-
            </button>
            <button className="tool-btn" title="Fit to Screen">
              📐
            </button>
          </div>
        </main>
        
        {/* Properties Panel */}
        {showProperties && selectedComponent && (
          <aside className="properties-panel">
            <div className="panel-header">
              <h3>Properties</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProperties(false)}
              >
                ×
              </button>
            </div>
            
            <div className="panel-content">
              {(() => {
                const component = components.find(c => c.id === selectedComponent);
                if (!component) return null;
                
                return (
                  <div className="component-properties">
                    <div className="property-group">
                      <label>Name</label>
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
                      <label>Position</label>
                      <div className="position-inputs">
                        <input 
                          type="number" 
                          value={Math.round(component.position.x)} 
                          onChange={(e) => {
                            setComponents(prev => prev.map(c => 
                              c.id === selectedComponent 
                                ? { ...c, position: { ...c.position, x: parseInt(e.target.value) }}
                                : c
                            ));
                          }}
                        />
                        <input 
                          type="number" 
                          value={Math.round(component.position.y)} 
                          onChange={(e) => {
                            setComponents(prev => prev.map(c => 
                              c.id === selectedComponent 
                                ? { ...c, position: { ...c.position, y: parseInt(e.target.value) }}
                                : c
                            ));
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="property-group">
                      <label>Rotation</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        value={component.rotation} 
                        onChange={(e) => {
                          setComponents(prev => prev.map(c => 
                            c.id === selectedComponent 
                              ? { ...c, rotation: parseInt(e.target.value) }
                              : c
                          ));
                        }}
                      />
                      <span>{component.rotation}°</span>
                    </div>
                    
                    <div className="property-group">
                      <label>Description</label>
                      <p className="component-description">
                        {component.properties.description}
                      </p>
                    </div>
                    
                    <div className="property-group">
                      <label>Pins</label>
                      <div className="pins-list">
                        {component.properties.pins?.map((pin, index) => (
                          <div key={index} className="pin-item">
                            {pin}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="delete-btn" onClick={deleteComponent}>
                      🗑️ Delete Component
                    </button>
                  </div>
                );
              })()
              }
            </div>
          </aside>
        )}
        
        {/* Code Editor Panel */}
        {showCodeEditor && (
          <div className={`code-panel ${isIDEFullscreen ? 'fullscreen' : ''}`}>
            <div className="panel-header">
              <h3>Arduino Code</h3>
              <div className="code-editor-controls">
                <button 
                   className="run-btn"
                   onClick={handleRunCode}
                   disabled={isRunning}
                 >
                   {isRunning ? '⏳ Running...' : '▶️ Run'}
                 </button>
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowCodeEditor(false);
                    setIsIDEFullscreen(false);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
            <CodeEditor 
              value={code}
              onChange={setCode}
              language="cpp"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArduinoSimulator;