import React from 'react';
import './SnakeFood.css';

function SnakeFood({ snakeFood }) {
    return (
        <div className="SnakeFood" style={{ gridColumnStart: snakeFood[0], gridRowStart: snakeFood[1] }}>
            
        </div>
    );
}

export default SnakeFood;
