import React, { Component } from 'react';
import './App.css';
import logo from './bowlingLogo.jpg';
import ParticlesBg from 'particles-bg';
import BowlingScorer from '../bowlingScorer'; // Import the BowlingScorer class

// Header component for the app
const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Techno Bowling!</h1>
  </header>
);

// Frame component to display individual frames on the scoreboard
const Frame = ({ frameNumber, leftBox, rightBox, extraBox, score }) => (
  <div className="frame">
    <div className="frame-number">{frameNumber}</div>
    <div className="frame-score">
      <div className="box left">{leftBox}</div>
      <div className="box right">{rightBox}</div>
      <div className="box extra">{extraBox}</div>
    </div>
    <div className="running-score">{!isNaN(score) && score}</div>
  </div>
);

// Controls component for rolling and resetting the game
const Controls = ({ handleRoll, handleReset, pinsUp }) => (
  <div className="controls">
    <div className="controls-left">
      {[...Array(pinsUp + 1)].map((o, i) => (
        <button key={i} className="roll" onClick={() => handleRoll(i)}>
          {i}
        </button>
      ))}
    </div>
    <div className="controls-right">
      <div className="roll reset" onClick={() => handleReset()}>
        Reset Game {pinsUp}
      </div>
    </div>
  </div>
);

// ScoreBoard component to manage the game and display the scoreboard
class ScoreBoard extends Component {
  constructor() {
    super();
    this.game = BowlingScorer.create(); // Create a new instance of BowlingScorer
    this.state = {
      score: this.game.score() // Get the initial score data from BowlingScorer
    };
  }

  // Method to handle rolling a certain number of pins
  roll = pins => {
    this.game.roll(pins); // Call the roll method of BowlingScorer
    this.setState({ score: this.game.score() }); // Update the state with new score data
  };

  // Method to reset the game
  reset = () => {
    this.game.reset(); // Call the reset method of BowlingScorer
    this.setState({ score: this.game.score() }); // Update the state with new score data
  };

  // Method to get the number of pins left standing
  pinsUp = () => this.game.pinsUp();

  render() {
    const { score } = this.state;

    return (
      <div>
        <Controls handleRoll={this.roll} handleReset={this.reset} pinsUp={this.pinsUp()} />

        {/* Display the player's name */}
        <div className="player-name">Zayne</div>

        {/* Display the scoreboard */}
        <div className="score-board">
          {[...Array(10)].map((o, i) => (
            <Frame
              key={i}
              frameNumber={i + 1}
              leftBox={score[i].leftBox}
              rightBox={score[i].rightBox}
              extraBox={score[i].extraBox}
              score={score[i].cumulativeScore}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Main App component
const App = () => (
  <div className="App">
    <Header />
    <ScoreBoard />
    <ParticlesBg className="particles" color="#39FF14" type="cobweb" bg={true} />
  </div>
);

export default App;