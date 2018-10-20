import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Slots.scss';
import Slot from '../Slot/Slot';
import Bet from '../Bet/Bet';
import Balance from '../Balance/Balance'; 

class Slots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdate: false,
      arrWin: [10,30,50,70,100],
    }

    this.balance = 5000;
    this.currentBet = 20; // ставка
    this.arrCentral = []; // массив с центральными элементами
    this.totalWin = 0;

    this.betUpNode = '';
    this.betDownNode = '';
  }

  spin = () => { // крутить спин
    this.setState({
      isUpdate: true,
    });

    const barControl = ReactDOM.findDOMNode(this._spinButton); // находим кнопку спина

    barControl.disabled = true;                                // и деактивируем ее

    setTimeout(() => {
      barControl.disabled = false;                             // а после прокрутки, снова активируем
    },3000);                                                   

    console.log(this.betUpNode);

    if (this.betUpNode !== (undefined || '')) {
      this.betUpNode.disabled = true;
      this.betDownNode.disabled = true;
    }

    if (this.betUpNode !== (undefined || '')) {
      setTimeout(() => {
        this.betUpNode.disabled = false;
        this.betDownNode.disabled = false;
      }, 3000);
    }

    this.balance -= this.currentBet; // вычитаем из баланса сумму ставки

    setTimeout(() => { // вызываем функцию, определяющую выигрыш и обнуляем старые значение в центральной линии
      this.centralWin();
      this.arrCentral = [];
    }, 3000);
  }

  getBet = (value) => { // получить текущую ставку из ребенка Bet
    this.currentBet = value;
  } 

  getBalance = (value) => { // родитель получает баланс
    this.balance = value;
  }

  getCentralItem = (value) => { // получаем значения итемов в центральной горизонтали
    this.arrCentral[this.arrCentral.length] = value;
  }

  centralWin = () => { // определяет выигрыш по центральной горизонтали
    if ((this.arrCentral[0].textContent === this.arrCentral[1].textContent)
    &&(this.arrCentral[1].textContent === this.arrCentral[2].textContent)) {
      switch(this.arrCentral[0].textContent) { // считаем сумму выигрыша
        case 'J':
          this.totalWin = this.state.arrWin[0] * 3 * this.currentBet * 0.2;
          break;
        case 'Q':
          this.totalWin = this.state.arrWin[1] * 3 * this.currentBet * 0.2;
          break; 
        case 'K':
          this.totalWin = this.state.arrWin[2] * 3 * this.currentBet * 0.2;
          break;
        case 'A':
          this.totalWin = this.state.arrWin[3] * 3 * this.currentBet * 0.2;
          break;
        case 'Wild':
          this.totalWin = this.state.arrWin[4] * 3 * this.currentBet * 0.2;
          break;
        default:
          break;
      }
    }

    this.balance += this.totalWin; // прибавляем выигрыш к балансу

    if (this.totalWin !== 0) {
      alert('You won: ' + this.totalWin);
      this.setState({
        isUpdate: true,
      });
      this.totalWin = 0; // обнуляем значение выигрыша
    }
  }

  getBetButtonsControl = (button1, button2) => { // функция отключения кнопок управления ставкой
    this.betUpNode = button1;                    // на время вращения спина
    this.betDownNode = button2;
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
          <Slot key="1" serialNumber={1} getCentralItem={this.getCentralItem}/>
          <Slot key="2" serialNumber={2} getCentralItem={this.getCentralItem}/>
          <Slot key="3" serialNumber={3} getCentralItem={this.getCentralItem}/>
        </section>
        <section className="Bar-Control">
          <div className="bet">
            <Bet getBet={this.getBet} ref={(node) => {this._bet = node;}} getBetControls={this.getBetButtonsControl}/>
          </div>
          <button className="Spin" onClick={this.spin} ref={(node) => {this._spinButton = node;}}>SPIN</button>
          <Balance getBalance={this.getBalance} 
                   currentBalance={this.balance}/>
        </section>
      </div>
    );
  }
}

export default Slots;
