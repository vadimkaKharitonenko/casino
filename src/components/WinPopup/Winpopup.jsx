import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Winpopup.scss';

class Winpopup extends Component {
  showPopup = () => {
    this.winMessage = 'ДОБРЫЙ ПОЧАНТОК';

    if (this.props.winScore !== 0) {
      const Winpopup = ReactDOM.findDOMNode(this._popup);
      Winpopup.style.opacity = '1';

      setTimeout(() => {
        Winpopup.style.opacity = '0';
      }, 3000);
    }
  }

  componentDidUpdate() {
    this.showPopup();
  }

  render() {
    return(
      <div className="Winpopup" ref={(node) => {this._popup = node;}}>{this.winMessage} {this.props.winScore}</div>
    )
  }
}

export default Winpopup;