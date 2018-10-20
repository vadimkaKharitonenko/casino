import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import Slots from './components/Slots/Slots';
import opening from '../src/sounds/opening.mp3';

class App extends Component {

  componentDidMount() {
    const audio = ReactDOM.findDOMNode(this._audio);
    audio.volume=0.01;
  }

  render() {
    
    return (
      <div className="App">
        <Slots/>
        <audio src={opening} autoPlay ref={(node) => {this._audio = node;}}></audio>
      </div>
    );
  }
}

export default App;
