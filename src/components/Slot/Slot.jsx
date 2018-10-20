import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Slot.scss';
import J from '../../images/J.png';
import Q from '../../images/Q.png';
import K from '../../images/K.png';
import A from '../../images/A.png';
import Wild from '../../images/Wild.png';

class Slot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSymbols: ["A","K","K","Q","Q","J","J","J","J","Wild"], // все возможные символы
      allSymbolsRevert: ["Wild","J","J","J","J","Q","Q","Q","Q","K","K","A"], // массив для второй составляющей игровую линию
      allSymbolsX2: ["A","K","K","Q","Q","J","J","J","J","Q","Q","K","K","A"], // массив для третьей составляющей игровую линию
    }

    this.allSlots = [];
  }

  setImages = (arr) => {
    for(let i = 0; i < arr.length; i++) {
      if (arr[i].innerHTML === 'J') {
        arr[i].style.backgroundImage = "url("+ J + ")";
      }
      if (arr[i].innerHTML === 'Q') {
        arr[i].style.backgroundImage = "url("+ Q + ")";
      }
      if (arr[i].innerHTML === 'K') {
        arr[i].style.backgroundImage = "url("+ K + ")";
      }
      if (arr[i].innerHTML === 'A') {
        arr[i].style.backgroundImage = "url("+ A + ")";
      }
      if (arr[i].innerHTML === 'Wild') {
        arr[i].style.backgroundImage = "url("+ Wild + ")";
      }
    }
  }

  getAllSlots = () => { // TODO: костыль, нужно переделать, получаем все слоты
    this.allSlots = document.getElementsByClassName('Slot__item');
    this.setImages(this.allSlots);
  }

  shuffle = (a) => { // функция для случайного перемешивания
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  componentDidUpdate() { //  функция для прокрутки линий наверх
    const slotDom = ReactDOM.findDOMNode(this._slot);
    slotDom.style.top = "-2000px";
    this.props.getCentralItem(this.getCentralLine());
    this.props.getTopItem(this.getTopLine());
    this.props.getBottomItem(this.getBottomLine());
    this.getAllSlots();
  }

  componentDidMount() {
    this.getAllSlots();
  }

  scrollGameLine = () => { //  функция для прокрутки линий вниз
    const slotDom = ReactDOM.findDOMNode(this._slot);
    slotDom.style.top = "-130px";
  }

  getRandomArbitrary = (min, max) => { //  определяем величину задержки перед прокруткой линии
    return Math.random() * (max - min) + min;
  }

  getCentralLine = () => {
    return ReactDOM.findDOMNode(this._thirdSlotItem);
  }

  getTopLine = () => {
    return ReactDOM.findDOMNode(this._topSlotItem);
  }

  getBottomLine = () => {
    return ReactDOM.findDOMNode(this._bottomSlotItem);
  }

  render() {
    this.countArr = -1; // счетчик для определения элемента в линии
    
    this.gameLineFirst = this.shuffle(this.state.allSymbols);  // формируем первую линию
    this.gameLineSecond = this.shuffle(this.state.allSymbolsRevert); // формируем вторую линию
    this.gameLineThird = this.shuffle(this.state.allSymbolsX2); // формируем третью линию
    
    this.gameLine = this.gameLineThird.concat(this.gameLineFirst.concat(this.gameLineSecond)); // складываем все линии и получаем конечную линию
    this.gameLineShow = this.gameLine.map((item) => {
      this.countArr += 1;
      if (this.countArr === 2) { // находим центральные элементы 
        return <div key={Math.random()} ref={(node) => {this._thirdSlotItem = node;}} className="Slot__item">{item}</div>
      } else if (this.countArr === 1) {
        return <div key={Math.random()} ref={(node) => {this._topSlotItem = node;}} className="Slot__item">{item}</div>
      } else if (this.countArr === 3) {
        return <div key={Math.random()} ref={(node) => {this._bottomSlotItem = node;}} className="Slot__item">{item}</div>
      } else {
        return <div key={Math.random()} className="Slot__item">{item}</div>
      }
    })

    setTimeout(() => { // функция для задержки перед скроллом линии
      this.scrollGameLine();
    }, this.getRandomArbitrary(1000,2000));
    return (
      <div className="Slot" ref={(node) => {this._slot = node;}}>
        {this.gameLineShow}
      </div>
    );
  }
}

export default Slot;
