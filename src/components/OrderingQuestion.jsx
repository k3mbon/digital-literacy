import React, { useState } from 'react';
import '../styles/OrderingQuestion.css';

const OrderingQuestion = ({ items, onOrderChange, selectedOrder }) => {
  const [currentOrder, setCurrentOrder] = useState(selectedOrder || [...Array(items.length).keys()]);
  const [draggedItem, setDraggedItem] = useState(null);


  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newOrder = [...currentOrder];
    const draggedValue = newOrder[draggedItem];
    
    // Remove the dragged item
    newOrder.splice(draggedItem, 1);
    
    // Insert at the new position
    newOrder.splice(dropIndex, 0, draggedValue);
    
    setCurrentOrder(newOrder);
    setDraggedItem(null);
    
    // Notify parent component of the new order
    if (onOrderChange) {
      onOrderChange(newOrder);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const getItemStyle = (index) => {
    return {
      transform: draggedItem === index ? 'rotate(2deg) scale(1.02)' : 'none',
      opacity: draggedItem === index ? 0.8 : 1,
      zIndex: draggedItem === index ? 1000 : 1
    };
  };

  const getDropZoneStyle = (index) => {
    return {
      backgroundColor: draggedItem !== null && draggedItem !== index ? 
        'rgba(59, 130, 246, 0.1)' : 'transparent',
      borderColor: draggedItem !== null && draggedItem !== index ? 
        '#3b82f6' : 'transparent'
    };
  };

  return (
    <div className="ordering-question">
      <p className="ordering-instruction">Drag and drop to arrange in correct order:</p>
      
      <div className="ordering-container">
        <div className="ordering-items">
          {currentOrder.map((itemIndex, position) => (
            <div
              key={`${itemIndex}-${position}`}
              className={`ordering-item ${
                draggedItem === position ? 'dragging' : ''
              }`}
              draggable
              style={getItemStyle(position)}
              onDragStart={(e) => handleDragStart(e, position)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, position)}
            >
              <div className="item-number">{position + 1}</div>
              <span className="item-text">{items[itemIndex]}</span>
              <div className="drag-handle">⋮⋮</div>
            </div>
          ))}
        </div>

        {/* Drop zones between items */}
        {currentOrder.map((_, index) => (
          <div
            key={`drop-${index}`}
            className="drop-zone"
            style={getDropZoneStyle(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderingQuestion;