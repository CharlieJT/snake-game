import React, { Component } from 'react';
import Snake from './Components/Snake/Snake';
import SnakeFood from './Components/SnakeFood/SnakeFood';
import { BsChevronUp, BsChevronDown, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './App.css';

const getRandomCoordsForFood = snakeCoords => {
  const max = 30;
  let x, y, randomNumber;
  do {
    x = Math.ceil(Math.random() * Math.ceil(max));
    y = Math.ceil(Math.random() * Math.ceil(max));
    randomNumber = snakeCoords.findIndex(coord => {
      return coord[0] === x && coord[1] === y;
    });
  } while (randomNumber + 1);
  return [x, y];
}

const initialState = {
  snakeFood: getRandomCoordsForFood([5, 16]),
  direction: 'RIGHT',
  snakeSpeed: 100000000,
  gamePlay: false,
  snakeCoords: [
    [5, 16]
  ]
}

class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.snakeSpeed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.outOfBorderCheck();
    this.snakeEatsItselfHandler();
    this.checkIfEaten();
  }

  onKeyDown = e => {
    const { direction } = this.state;
    e = e || window.event;
    switch (e.keyCode) {
      case 38: this.setDirection('UP', direction !== 'DOWN'); break;
      case 40: this.setDirection('DOWN', direction !== 'UP'); break;
      case 37: this.setDirection('LEFT', direction !== 'RIGHT'); break;
      case 39: this.setDirection('RIGHT', direction !== 'LEFT'); break;
      default: return;
    }
  }


  onButtonDown = turn => {
    const { direction } = this.state;
    switch (turn) {
      case 'UP': this.setDirection('UP', direction !== 'DOWN'); break;
      case 'DOWN': this.setDirection('DOWN', direction !== 'UP'); break;
      case 'LEFT': this.setDirection('LEFT', direction !== 'RIGHT'); break;
      case 'RIGHT': this.setDirection('RIGHT', direction !== 'LEFT'); break;
      default: return;
    }
  }

  setDirection = (direction, directionCheck) => {
    if (directionCheck) {
      this.setState({ direction: direction });
      setTimeout(() => {
        this.moveSnake();
      }, 10);
    }
  }

  moveSnake = () => {
    let coords = [...this.state.snakeCoords];
    let head = coords[coords.length - 1];
    switch (this.state.direction) {
      case 'RIGHT': head = [head[0] + 1, head[1]]; break;
      case 'LEFT': head = [head[0] - 1, head[1]]; break;
      case 'DOWN': head = [head[0], head[1] + 1]; break;
      case 'UP': head = [head[0], head[1] - 1]; break;
      default: head = [head[0], head[1]]; break;
    }
    coords.push(head);
    coords.shift();
    this.setState({ snakeCoords: coords });
  }

  outOfBorderCheck = () => {
    let head = this.state.snakeCoords[this.state.snakeCoords.length - 1];
    if (head[0] > 31 || head[1] > 31 || head[0] <= 0 || head[1] <= 0) {
      this.onGameOver();
    }
  }

  snakeEatsItselfHandler = () => {
    let snake = [...this.state.snakeCoords];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(coord => {
      if (head[0] === coord[0] && head[1] === coord[1]) {
        this.onGameOver();
      }
    });
  }

  onGameOver = () => {
    alert(`Game Over, You scored ${this.state.snakeCoords.length}`);
    this.setState(initialState);
  }

  checkIfEaten = () => {
    let snake = [...this.state.snakeCoords];
    let head = this.state.snakeCoords[this.state.snakeCoords.length - 1];
    let food = this.state.snakeFood;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({ snakeFood: getRandomCoordsForFood(snake) });
      this.expandSnake();
    }
  }

  expandSnake = () => {
    let newSnake = [ ...this.state.snakeCoords ];
    newSnake.unshift([]);
    this.setState({ snakeCoords: newSnake });
  }

  render() {

    return (
      <div className="App">
        <div className="snakeScore">
          <h3>Score: <b>{this.state.snakeCoords.length}</b></h3>
        </div>
        <div id="gameBoard">
          <Snake snakeCoords={this.state.snakeCoords}/>
          <SnakeFood snakeFood={this.state.snakeFood}/>
        </div>
        <div className="buttonGrid">
          <button style={{ gridRowStart: 1, gridColumnStart: 2 }} onClick={() => this.onButtonDown('UP')}><BsChevronUp /></button>
          <button style={{ gridRowStart: 2, gridColumnStart: 1 }} onClick={() => this.onButtonDown('LEFT')}><BsChevronLeft /></button>
          <button style={{ gridRowStart: 2, gridColumnStart: 3 }} onClick={() => this.onButtonDown('RIGHT')}><BsChevronRight /></button>
          <button style={{ gridRowStart: 3, gridColumnStart: 2 }} onClick={() => this.onButtonDown('DOWN')}><BsChevronDown /></button>
        </div>
      </div>
    );
  }
}

export default App;
