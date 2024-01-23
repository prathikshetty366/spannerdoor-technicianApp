// RowManager.js
import React, { useState, useEffect } from 'react';
import styles from './customerVoice.module.scss';

function CustomerVoice({ initialRows, onUpdate }) {
  const [items, setItems] = useState(initialRows);

  useEffect(() => {
    onUpdate(items); // Notify the parent component about the updated data
  }, [items, onUpdate]);

  const handlePriorityChange = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, priority: getNextPriority(item.priority) }
          : item
      )
    );
  };

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      type: 'customerVoice',
      voice: '',
      priority: 'normal',
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemoveRow = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleTextChange = (itemId, newVoice) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, voice: newVoice } : item
      )
    );
  };

  const getNextPriority = (currentPriority) => {
    const priorities = ['normal', 'medium', 'high'];
    const currentIndex = priorities.indexOf(currentPriority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    return priorities[nextIndex];
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <div className={styles.voice}>Customer Voice</div>
        <div className={styles.priority}>Priority</div>
        <div className={styles.remove}>Remove</div>
      </div>
      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <input
            type="voice"
            value={item.voice || ''}
            onChange={(e) => handleTextChange(item.id, e.target.value)}
          />
          <button
            className={styles[item.priority]}
            onClick={() => handlePriorityChange(item.id)}
          >
            {item.priority}
          </button>
          <button onClick={() => handleRemoveRow(item.id)}>Remove</button>
        </div>
      ))}
      <button className={styles.add} onClick={handleAddRow}>
        Add
      </button>
    </div>
  );
}

export default CustomerVoice;
