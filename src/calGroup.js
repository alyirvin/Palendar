import React from 'react';
import './groups.css';

const CalGroup = ({ groups, handleCalSelect, handleMenuSelect }) => {
  return (
    <>
      {groups.length > 0 ? (
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
          {groups.map((group, index) => (
            <li key={index} style={{ marginRight: '20px' }}>
              <button className="calGroups" value={group} onClick={() => handleCalSelect(group)}>
                {group.name}
              </button>
            </li>
          ))}
          <li>
            <button id="addGroup" onClick={handleMenuSelect}>
              Add a Group
            </button>
          </li>
        </ul>
      ) : (
        <div>
          <ul>
            <li>
              <button id="addGroup" onClick={handleMenuSelect}>
                Add a Group
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default CalGroup;