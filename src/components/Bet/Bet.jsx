import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Bet.scss';

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

  componentDidUpdate() {
    const betUpNode = ReactDOM.findDOMNode(this._betUp);     // получаем ноду кнопки повышения ставки
    const betDownNode = ReactDOM.findDOMNode(this._betDown); // и понижения ставки
    betUpNode.disabled = true;                               // делаем их неактивными на время вращения спина
    betDownNode.disabled = true;

    setTimeout(() => {                                       // а затем опять активируем
      betUpNode.disabled = false;
      betDownNode.disabled = false;
    }, 3000);
  }

  render() {
    return(
      <div className="Bet">
        Ставка: {this.currentBet}
        <div className="bet-control">
          <button className="betUp" onClick={this.betUp} ref={(node) => {this._betUp = node;}}>Up</button>
          <button className="betDown" onClick={this.betDown} ref={(node) => {this._betDown = node;}}>Down</button>
        </div>
      </div>
    )
  }
}

export default Bet;