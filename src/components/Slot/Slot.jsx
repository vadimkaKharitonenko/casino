import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Slot.scss';

class Slot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSymbols: ["A","K","K","Q","Q","J","J","J","J","Wild"], // все возможные символы
      allSymbolsRevert: ["Wild","J","J","J","J","Q","Q","Q","Q","K","K","A"], // массив для второй составляющей игровую линию
      allSymbolsX2: ["A","K","K","Q","Q","J","J","J","J","Q","Q","K","K","A"], // массив для третьей составляющей игровую линию
    }
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
  }

  scrollGameLine = () => { //  функция для прокрутки линий вниз
    const slotDom = ReactDOM.findDOMNode(this._slot);
    slotDom.style.top = "-100px";
  }

  getRandomArbitrary = (min, max) => { //  определяем величину задержки перед прокруткой линии
    return Math.random() * (max - min) + min;
  }

  getCentralLine = () => {
    return ReactDOM.findDOMNode(this._thirdSlotItem);
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
