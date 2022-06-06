import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/icons/logo.svg';
import './header.scss';

import { setCurrency } from '../../core/redux/appSlice';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isClickCurrency: false,
    };
  }

  setIsClickCurrency = () => {
    this.setState((prevState) => {
      return { isClickCurrency: !prevState.isClickCurrency };
    });
  };

  render() {
    const { categories, currencies, currency, setCurrency } = this.props;
    const { isClickCurrency } = this.state;

    return (
      <header className='header container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            {categories.map((category, idx) => (
              <li className='header__nav-item' key={idx}>
                <NavLink
                  to={`category/${category}`}
                  className='header__nav-link'
                >
                  {category}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <NavLink className='header__logo' to={`category/${categories[0]}`}>
          <img src={logo} alt='logo'></img>
        </NavLink>
        <div className='header__other'>
          <button
            className={
              isClickCurrency ? 'header__currency active' : 'header__currency'
            }
            onClick={this.setIsClickCurrency}
          >
            {currency.symbol}
          </button>
          <button className='header__cart'></button>

          {isClickCurrency && (
            <ul className='header__currencies'>
              {currencies.map((currency, idx) => (
                <li
                  className='header__currencies-item'
                  key={idx}
                  onClick={() => {
                    setCurrency(currency);
                    this.setIsClickCurrency();
                  }}
                >
                  <button className='header__currencies-btn'>{`${currency.symbol} ${currency.label}`}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
  currencies: state.currencies,
});

export default connect(props, { setCurrency })(Header);
