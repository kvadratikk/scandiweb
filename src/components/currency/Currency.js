import React from 'react';
import { connect } from 'react-redux';
import { setCurrency } from '../../core/redux/appSlice';

class Currency extends React.Component {
  render() {
    const { currency, setCurrency, setIsClickCurrency } = this.props;

    return (
      <li
        className='header__currencies-item'
        onClick={() => {
          setCurrency(currency);
          setIsClickCurrency(false);
        }}
      >
        <button className='header__currencies-btn click'>{`${currency.symbol} ${currency.label}`}</button>
      </li>
    );
  }
}

const props = () => ({});
export default connect(props, { setCurrency })(Currency);
