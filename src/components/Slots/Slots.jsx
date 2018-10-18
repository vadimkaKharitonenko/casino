import React, { Component } from 'react';
import './Slots.scss';
import Slot from '../Slot/Slot';
import Bet from '../Bet/Bet';

class Slots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      balance: 5000, // баланс
    }

    this.currentBet = 20; // ставка
  }

  spin = () => { // крутить спин
    this.setState({
      isUpdate: true,
      balance: this.state.balance - this.currentBet,
    });
  }

  getBet = (value) => { // получить текущую ставку из ребенка Bet
    this.currentBet = value;
  } 

  shouldComponentUpdate(nextState) { // обновляем
    if(this.state.isUpdate !== nextState.isUpdate) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="Slots-container">
        <section className="Slots" ref={(node) => {this._slots = node;}}>
          <Slot key="1" serialNumber={1}/>
          <Slot key="2" serialNumber={2}/>
          <Slot key="3" serialNumber={3}/>
        </section>
        <section className="Bar-Control">
          <div className="bet">
            <Bet getBet={this.getBet}/>
          </div>
          <button className="Spin" onClick={this.spin}>SPIN</button>
          <div className="balance">Баланс: {this.state.balance}</div>
        </section>
      </div>
    );
  }
}

export default Slots;
