import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Bet.scss';
import hard from '../../sounds/hard.mp3';

class Bet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
    }

    this.currentBet = 20; // текущая ставка
    this.maxBet = 100; // максимальная ставка
    this.minBet = 20; // минимальная ставка
  }

  betUp = () => { // поднять ставку
    if (this.currentBet === this.maxBet) {
      const audio4 = ReactDOM.findDOMNode(this._audio4);
      audio4.volume = 0.01;
      audio4.play();
    } else {
      this.currentBet = this.currentBet + 20;
      this.setState({ // обновить компонент
        isUpdate: true,
      });
    }

    this.props.getBet(this.currentBet); // передаем в родителя текущую ставку
  }

  betDown = () => { // понизить ставку 
    if (this.currentBet === this.minBet) {
       
    } else {
      this.currentBet = this.currentBet - 20; 
      this.setState({ // обновить компонент
        isUpdate: true,
      });
    }

    this.props.getBet(this.currentBet); // передаем в родителя текущую ставку
  }

  sendBetControls = () => {
    const betUpNode = ReactDOM.findDOMNode(this._betUp);     // получаем ноду кнопки повышения ставки
    const betDownNode = ReactDOM.findDOMNode(this._betDown); // и понижения ставки
  
    this.props.getBetControls(betUpNode, betDownNode);       // отправляем кнопки в родителя
  }

  componentDidMount() {
    this.sendBetControls();
  }

  render() {
    return(
      <div className="Bet">
        Ставка <br/> {this.currentBet}
        <div className="bet-control">
          <button className="betUp" onClick={this.betUp} ref={(node) => {this._betUp = node;}}>&and;</button>
          <button className="betDown" onClick={this.betDown} ref={(node) => {this._betDown = node;}}>&or;</button>
          <audio src={hard} ref={(node) => {this._audio4 = node;}}></audio>
        </div>
      </div>
    )
  }
}

export default Bet;