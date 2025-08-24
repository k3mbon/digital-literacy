import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, Target, Zap } from 'lucide-react';
import '../styles/MiniGames.css';

// Algorithm Sorting Game
const AlgorithmSortingGame = ({ onComplete }) => {
  const [numbers, setNumbers] = useState([]);
  const [userSolution, setUserSolution] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
    setNumbers([...newNumbers]);
    setUserSolution([]);
    setGameComplete(false);
  };

  const handleDragStart = (e, number, index) => {
    setDraggedItem({ number, index, source: 'numbers' });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedItem) {
      const newSolution = [...userSolution];
      newSolution[targetIndex] = draggedItem.number;
      setUserSolution(newSolution);
      setDraggedItem(null);
    }
  };

  const checkSolution = () => {
    const correctSolution = [...numbers].sort((a, b) => a - b);
    const isCorrect = userSolution.length === correctSolution.length && 
                     userSolution.every((num, index) => num === correctSolution[index]);
    
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + Math.max(100 - (attempts * 10), 10));
      setGameComplete(true);
      onComplete && onComplete(score + Math.max(100 - (attempts * 10), 10));
    }
  };

  return (
    <div className="mini-game algorithm-game">
      <div className="game-header">
        <h4>🧩 Algorithm Sorting Challenge</h4>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Attempts: {attempts}</span>
        </div>
      </div>
      
      <div className="game-instructions">
        <p>Drag the numbers to sort them in ascending order (smallest to largest)</p>
      </div>
      
      <div className="sorting-area">
        <div className="numbers-pool">
          <h5>Numbers to Sort:</h5>
          <div className="numbers-container">
            {numbers.map((number, index) => (
              <div
                key={`${number}-${index}`}
                className="draggable-number"
                draggable
                onDragStart={(e) => handleDragStart(e, number, index)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        
        <div className="solution-area">
          <h5>Your Solution:</h5>
          <div className="drop-zones">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`drop-zone ${userSolution[index] ? 'filled' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {userSolution[index] || '?'}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="game-controls">
        <button onClick={checkSolution} disabled={userSolution.length !== 6 || gameComplete}>
          {gameComplete ? <CheckCircle size={16} /> : <Target size={16} />}
          {gameComplete ? 'Completed!' : 'Check Solution'}
        </button>
        <button onClick={generateNewPuzzle}>
          <RotateCcw size={16} />
          New Puzzle
        </button>
      </div>
      
      {gameComplete && (
        <div className="success-message">
          <Trophy size={20} />
          <span>Great job! You sorted the numbers correctly!</span>
        </div>
      )}
    </div>
  );
};

// Data Management Game
const DataManagementGame = ({ onComplete }) => {
  const [dataItems, setDataItems] = useState([]);
  const [categories, setCategories] = useState({
    personal: [],
    business: [],
    public: []
  });
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateDataItems();
  }, []);

  const generateDataItems = () => {
    const items = [
      { id: 1, name: 'Social Security Number', category: 'personal', type: 'sensitive' },
      { id: 2, name: 'Company Revenue', category: 'business', type: 'confidential' },
      { id: 3, name: 'Weather Data', category: 'public', type: 'open' },
      { id: 4, name: 'Medical Records', category: 'personal', type: 'sensitive' },
      { id: 5, name: 'Product Catalog', category: 'public', type: 'open' },
      { id: 6, name: 'Employee Salaries', category: 'business', type: 'confidential' },
      { id: 7, name: 'Public Transportation Schedule', category: 'public', type: 'open' },
      { id: 8, name: 'Bank Account Details', category: 'personal', type: 'sensitive' }
    ];
    setDataItems(items);
    setCategories({ personal: [], business: [], public: [] });
    setGameComplete(false);
  };

  const handleDrop = (item, category) => {
    setCategories(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
    setDataItems(prev => prev.filter(dataItem => dataItem.id !== item.id));
  };

  const checkSolution = () => {
    let correctPlacements = 0;
    Object.entries(categories).forEach(([categoryName, items]) => {
      items.forEach(item => {
        if (item.category === categoryName) {
          correctPlacements++;
        }
      });
    });
    
    const totalItems = Object.values(categories).flat().length;
    const accuracy = totalItems > 0 ? (correctPlacements / totalItems) * 100 : 0;
    
    setScore(Math.round(accuracy));
    setGameComplete(true);
    onComplete && onComplete(Math.round(accuracy));
  };

  return (
    <div className="mini-game data-game">
      <div className="game-header">
        <h4>🗂️ Data Classification Challenge</h4>
        <div className="game-stats">
          <span>Score: {score}%</span>
        </div>
      </div>
      
      <div className="game-instructions">
        <p>Drag each data item to the correct category based on its privacy level</p>
      </div>
      
      <div className="data-classification">
        <div className="data-items">
          <h5>Data Items:</h5>
          {dataItems.map(item => (
            <div
              key={item.id}
              className={`data-item ${item.type}`}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(item))}
            >
              {item.name}
              <span className="item-type">{item.type}</span>
            </div>
          ))}
        </div>
        
        <div className="categories">
          {Object.entries(categories).map(([categoryName, items]) => (
            <div
              key={categoryName}
              className="category-zone"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const item = JSON.parse(e.dataTransfer.getData('text/plain'));
                handleDrop(item, categoryName);
              }}
            >
              <h5>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Data</h5>
              <div className="category-items">
                {items.map(item => (
                  <div key={item.id} className={`categorized-item ${item.type}`}>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="game-controls">
        <button onClick={checkSolution} disabled={dataItems.length > 0 || gameComplete}>
          {gameComplete ? <CheckCircle size={16} /> : <Target size={16} />}
          {gameComplete ? 'Completed!' : 'Check Classification'}
        </button>
        <button onClick={generateDataItems}>
          <RotateCcw size={16} />
          Reset Game
        </button>
      </div>
      
      {gameComplete && (
        <div className="success-message">
          <Trophy size={20} />
          <span>Data classified with {score}% accuracy!</span>
        </div>
      )}
    </div>
  );
};

// Network Connection Game
const NetworkConnectionGame = ({ onComplete }) => {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeNetwork();
  }, []);

  const initializeNetwork = () => {
    const networkNodes = [
      { id: 1, x: 100, y: 100, type: 'router', connected: false },
      { id: 2, x: 300, y: 100, type: 'computer', connected: false },
      { id: 3, x: 500, y: 100, type: 'server', connected: false },
      { id: 4, x: 200, y: 250, type: 'computer', connected: false },
      { id: 5, x: 400, y: 250, type: 'computer', connected: false }
    ];
    setNodes(networkNodes);
    setConnections([]);
    setSelectedNode(null);
    setGameComplete(false);
  };

  const handleNodeClick = (node) => {
    if (!selectedNode) {
      setSelectedNode(node);
    } else if (selectedNode.id !== node.id) {
      const newConnection = {
        from: selectedNode.id,
        to: node.id,
        id: `${selectedNode.id}-${node.id}`
      };
      setConnections(prev => [...prev, newConnection]);
      setSelectedNode(null);
    } else {
      setSelectedNode(null);
    }
  };

  const checkNetwork = () => {
    // Check if all computers are connected to router or server
    const routerNode = nodes.find(n => n.type === 'router');
    const serverNode = nodes.find(n => n.type === 'server');
    const computerNodes = nodes.filter(n => n.type === 'computer');
    
    let validConnections = 0;
    computerNodes.forEach(computer => {
      const hasValidConnection = connections.some(conn => 
        (conn.from === computer.id && (conn.to === routerNode.id || conn.to === serverNode.id)) ||
        (conn.to === computer.id && (conn.from === routerNode.id || conn.from === serverNode.id))
      );
      if (hasValidConnection) validConnections++;
    });
    
    const accuracy = (validConnections / computerNodes.length) * 100;
    setScore(Math.round(accuracy));
    setGameComplete(true);
    onComplete && onComplete(Math.round(accuracy));
  };

  return (
    <div className="mini-game network-game">
      <div className="game-header">
        <h4>🌐 Network Connection Challenge</h4>
        <div className="game-stats">
          <span>Score: {score}%</span>
          <span>Connections: {connections.length}</span>
        </div>
      </div>
      
      <div className="game-instructions">
        <p>Click on nodes to connect them. Connect all computers to the router or server!</p>
      </div>
      
      <div className="network-canvas">
        <svg width="600" height="350">
          {/* Render connections */}
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            return (
              <line
                key={conn.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#9fef00"
                strokeWidth="3"
                opacity="0.8"
              />
            );
          })}
          
          {/* Render nodes */}
          {nodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={selectedNode?.id === node.id ? '#9fef00' : 
                      node.type === 'router' ? '#3b82f6' : 
                      node.type === 'server' ? '#ef4444' : '#22c55e'}
                stroke="#ffffff"
                strokeWidth="2"
                className="network-node"
                onClick={() => handleNodeClick(node)}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
                pointerEvents="none"
              >
                {node.type === 'router' ? '🔀' : node.type === 'server' ? '🖥️' : '💻'}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="game-controls">
        <button onClick={checkNetwork} disabled={gameComplete}>
          {gameComplete ? <CheckCircle size={16} /> : <Target size={16} />}
          {gameComplete ? 'Completed!' : 'Check Network'}
        </button>
        <button onClick={initializeNetwork}>
          <RotateCcw size={16} />
          Reset Network
        </button>
      </div>
      
      {gameComplete && (
        <div className="success-message">
          <Trophy size={20} />
          <span>Network configured with {score}% efficiency!</span>
        </div>
      )}
    </div>
  );
};

// System Performance Game
const SystemPerformanceGame = ({ onComplete }) => {
  const [systemStats, setSystemStats] = useState({
    cpu: 50,
    memory: 60,
    storage: 40,
    network: 30
  });
  const [targetStats, setTargetStats] = useState({});
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateTarget();
  }, []);

  const generateTarget = () => {
    const target = {
      cpu: Math.floor(Math.random() * 30) + 70,
      memory: Math.floor(Math.random() * 20) + 80,
      storage: Math.floor(Math.random() * 40) + 60,
      network: Math.floor(Math.random() * 30) + 70
    };
    setTargetStats(target);
    setGameComplete(false);
  };

  const adjustStat = (stat, change) => {
    setSystemStats(prev => ({
      ...prev,
      [stat]: Math.max(0, Math.min(100, prev[stat] + change))
    }));
  };

  const checkPerformance = () => {
    let totalDifference = 0;
    Object.keys(targetStats).forEach(stat => {
      totalDifference += Math.abs(systemStats[stat] - targetStats[stat]);
    });
    
    const accuracy = Math.max(0, 100 - (totalDifference / 4));
    setScore(Math.round(accuracy));
    setGameComplete(true);
    onComplete && onComplete(Math.round(accuracy));
  };

  return (
    <div className="mini-game system-game">
      <div className="game-header">
        <h4>⚡ System Performance Challenge</h4>
        <div className="game-stats">
          <span>Score: {score}%</span>
        </div>
      </div>
      
      <div className="game-instructions">
        <p>Adjust system resources to match the target performance levels</p>
      </div>
      
      <div className="performance-dashboard">
        {Object.entries(systemStats).map(([stat, value]) => (
          <div key={stat} className="stat-control">
            <div className="stat-header">
              <span className="stat-name">{stat.toUpperCase()}</span>
              <span className="stat-values">
                Current: {value}% | Target: {targetStats[stat]}%
              </span>
            </div>
            <div className="stat-bar">
              <div 
                className="stat-fill current"
                style={{ width: `${value}%` }}
              />
              <div 
                className="stat-target"
                style={{ left: `${targetStats[stat]}%` }}
              />
            </div>
            <div className="stat-controls">
              <button onClick={() => adjustStat(stat, -5)}>-5</button>
              <button onClick={() => adjustStat(stat, -1)}>-1</button>
              <button onClick={() => adjustStat(stat, 1)}>+1</button>
              <button onClick={() => adjustStat(stat, 5)}>+5</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="game-controls">
        <button onClick={checkPerformance} disabled={gameComplete}>
          {gameComplete ? <CheckCircle size={16} /> : <Target size={16} />}
          {gameComplete ? 'Completed!' : 'Check Performance'}
        </button>
        <button onClick={generateTarget}>
          <RotateCcw size={16} />
          New Target
        </button>
      </div>
      
      {gameComplete && (
        <div className="success-message">
          <Trophy size={20} />
          <span>System optimized with {score}% accuracy!</span>
        </div>
      )}
    </div>
  );
};

// Main MiniGame Component
const MiniGame = ({ topicId, onComplete, onClose }) => {
  const getGameComponent = () => {
    switch (topicId) {
      case '1':
        return <AlgorithmSortingGame onComplete={onComplete} />;
      case '2':
        return <DataManagementGame onComplete={onComplete} />;
      case '3':
        return <NetworkConnectionGame onComplete={onComplete} />;
      case '4':
        return <SystemPerformanceGame onComplete={onComplete} />;
      default:
        return <AlgorithmSortingGame onComplete={onComplete} />;
    }
  };

  return (
    <div className="mini-game-modal">
      <div className="mini-game-content">
        <div className="mini-game-header">
          <h3>🎮 Interactive Challenge</h3>
          <button className="close-game" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="mini-game-body">
          {getGameComponent()}
        </div>
      </div>
    </div>
  );
};

export default MiniGame;
export { AlgorithmSortingGame, DataManagementGame, NetworkConnectionGame, SystemPerformanceGame };