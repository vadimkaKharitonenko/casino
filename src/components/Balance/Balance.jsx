import React, { Component } from 'react';
import './Balance.scss';

class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 5000, // баланс
      isUpdate: false,
    }

    this.props.getBalance(this.state.balance); // отправляем значение баланса в родителя
  }

  shouldComponentUpdate(nextState) { // обновляем
    if(this.state.isUpdate !== nextState.isUpdate) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <div className="balance">Сабжи<br/> {this.props.currentBalance}</div>
    )
  }
}

export default Balance;