import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/icons/logo.svg';
import './header.scss';

import Currency from '../currency/Currency';
import { setIsClickCart } from '../../core/redux/appSlice';
import { sumItems } from '../../core/helpers/functions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isClickCurrency: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', (e) => {
      for (let element in this.props.elements) {
        if (
          this.props.elements[element].current &&
          this.props.elements[element].current.contains(e.target)
        )
          return;
      }

      this.setIsClickCurrency(false);
      this.props.setIsClickCart(false);
    });
  }

  setIsClickCurrency = (value) => {
    this.setState({
      isClickCurrency: value,
    });
    this.props.setIsClickCart(false);
  };

  render() {
    const {
      categories,
      currencies,
      currency,
      isClickCart,
      setIsClickCart,
      elements,
      cart,
    } = this.props;
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
            ref={elements.btn}
            className={
              isClickCurrency ? 'header__currency active' : 'header__currency'
            }
            onClick={() => {
              this.setIsClickCurrency(!isClickCurrency);
            }}
          >
            {currency.symbol}
          </button>
          <button
            className='header__cart'
            ref={elements.cart}
            onClick={() => {
              this.setIsClickCurrency(false);
              setIsClickCart(!isClickCart);
            }}
          >
            <span className='header__total'>{sumItems(cart)}</span>
          </button>

          {isClickCurrency && (
            <ul className='header__currencies' ref={elements.currencies}>
              {currencies.map((currency, idx) => (
                <Currency
                  currency={currency}
                  key={idx}
                  setIsClickCurrency={this.setIsClickCurrency}
                />
              ))}
            </ul>
          )}
        </div>
      </header>
    );
  }
}

const props = (state) => ({
  cart: state.cart,
  currency: state.currency,
  currencies: state.currencies,
  categories: state.categories,
  isClickCart: state.isClickCart,
});

export default connect(props, { setIsClickCart })(Header);
