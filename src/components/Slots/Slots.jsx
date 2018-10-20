import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Slots.scss';
import Slot from '../Slot/Slot';
import Bet from '../Bet/Bet';
import Balance from '../Balance/Balance'; 
import Winpopup from '../WinPopup/Winpopup';
import NA from '../../sounds/na.mp3';
import good from '../../sounds/good.mp3';
import light from '../../sounds/light.mp3';

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
    this.arrTop = [];
    this.arrBottom = [];
    this.totalWin = 0; // сумма выигрыш

    this.betUpNode = ''; // кнопки контроля ставки
    this.betDownNode = '';
  }

  spin = () => { // крутить спин
    this.setState({
      isUpdate: true,
    });

    const audio = ReactDOM.findDOMNode(this._audio);
    audio.volume = 0.01;
    audio.play();

    const barControl = ReactDOM.findDOMNode(this._spinButton); // находим кнопку спина

    barControl.disabled = true;                                // и деактивируем ее

    setTimeout(() => {
      barControl.disabled = false;                             // а после прокрутки, снова активируем
    },3000);                                                   

    if (this.betUpNode !== (undefined || '')) {                // выключаем кнопки для ставки
      this.betUpNode.disabled = true;                          // и включаем обратно
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
      this.topWin();
      this.bottomWin();
      this.arrCentral = [];
      this.arrTop = [];
      this.arrBottom = [];
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

  getTopItem = (value) => { // получаем значения итемов в верхней горизонтали
    this.arrTop[this.arrTop.length] = value;
  }

  getBottomItem = (value) => { // получаем значения итемов в нижней горизонтали
    this.arrBottom[this.arrBottom.length] = value;
  }

  topWin = () => { // определяет выигрыш по верхней линии горизонтали
    if ((this.arrTop[0].textContent === this.arrTop[1].textContent)
    &&(this.arrTop[1].textContent === this.arrTop[2].textContent)) {
      switch(this.arrTop[0].textContent) { // считаем сумму выигрыша
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
      this.setState({
        isUpdate: true,
      });
      this.totalWin = 0; // обнуляем значение выигрыша
      this.winAudio();
    }
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
      this.setState({
        isUpdate: true,
      });
      this.totalWin = 0; // обнуляем значение выигрыша
      this.winAudio();
    }
  }

  bottomWin = () => { // определяет выигрыш по нижней горизонтали
    if ((this.arrBottom[0].textContent === this.arrBottom[1].textContent)
    &&(this.arrBottom[1].textContent === this.arrBottom[2].textContent)) {
      switch(this.arrBottom[0].textContent) { // считаем сумму выигрыша
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
      this.setState({
        isUpdate: true,
      });
      this.totalWin = 0; // обнуляем значение выигрыша
      this.winAudio();
    }
  }

  getBetButtonsControl = (button1, button2) => { // функция отключения кнопок управления ставкой
    this.betUpNode = button1;                    // на время вращения спина
    this.betDownNode = button2;
  }

  winAudio = () => {
    const audio3 = ReactDOM.findDOMNode(this._audio3);
    audio3.volume = 0.01;
    audio3.play();

    setTimeout(() => {
      const audio2 = ReactDOM.findDOMNode(this._audio2);
      audio2.volume = 0.01;
      audio2.play();
    }, 1000);
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
          <Slot key="1" serialNumber={1} getCentralItem={this.getCentralItem} getTopItem={this.getTopItem} getBottomItem={this.getBottomItem}/>
          <Slot key="2" serialNumber={2} getCentralItem={this.getCentralItem} getTopItem={this.getTopItem} getBottomItem={this.getBottomItem}/>
          <Slot key="3" serialNumber={3} getCentralItem={this.getCentralItem} getTopItem={this.getTopItem} getBottomItem={this.getBottomItem}/>
        </section>
        <section className="Bar-Control">
          <div className="bet">
            <Bet getBet={this.getBet} ref={(node) => {this._bet = node;}} getBetControls={this.getBetButtonsControl}/>
          </div>
          <button className="Spin" onClick={this.spin} ref={(node) => {this._spinButton = node;}}>ЖМИ КНОПКУ</button>
          <audio src={NA} ref={(node) => {this._audio = node;}}></audio>
          <audio src={light} ref={(node) => {this._audio2 = node;}}></audio>
          <audio src={good} ref={(node) => {this._audio3 = node;}}></audio>
          <Balance getBalance={this.getBalance} 
                   currentBalance={this.balance}/>
        </section>
        <Winpopup winScore={this.totalWin}/>
      </div>
    );
  }
}

export default Slots;
