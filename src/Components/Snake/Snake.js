import React from 'react';
import './Snake.css';

function Snake({ snakeCoords }) {
    return snakeCoords.map((snakeSegment, index) => {
        return snakeSegment.length !== 0 && <div key={index} className="Snake" style={{ gridColumnStart: snakeSegment[0], gridRowStart: snakeSegment[1] }}></div>   
    })
}

export default Snake;
