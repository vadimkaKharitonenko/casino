import React, { Component } from 'react';
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

  render() {
    return(
      <div className="Bet">
        Ставка: {this.currentBet}
        <div className="bet-control">
          <button className="betUp" onClick={this.betUp}>Up</button>
          <button className="betDown" onClick={this.betDown}>Down</button>
        </div>
      </div>
    )
  }
}

export default Bet;