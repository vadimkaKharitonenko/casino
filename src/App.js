import React, { Component } from 'react';
import './App.scss';
import Slots from './components/Slots/Slots';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Slots/>
      </div>
    );
  }
}

export default App;
