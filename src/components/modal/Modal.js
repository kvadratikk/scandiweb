import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Card from '../card/Card';
import { setIsClickCart, order } from '../../core/redux/appSlice';
import { sumItems, setCardKey, sumPrice } from '../../core/helpers/functions';

class Modal extends React.Component {
  render() {
    const { cart, currency, element, setIsClickCart, order } = this.props;

    return (
      <div className='cart-modal' ref={element}>
        <h5 className='cart-modal__title'>
          My Bag, <span>{sumItems(cart)} items</span>
        </h5>
        {(cart.length && (
          <ul className='cart-modal__list'>
            {cart.map((product) => (
              <Card
                title='modal'
                product={product}
                key={setCardKey(product)}
              ></Card>
            ))}
          </ul>
        )) ||
          null}
        <p className='cart-modal__price'>
          Total
          <span>
            {currency.symbol}
            {sumPrice(cart, currency.symbol)}
          </span>
        </p>
        <div className='cart-modal__buttons'>
          <NavLink
            to='cart'
            className='cart-modal__button'
            onClick={() => setIsClickCart(false)}
          >
            view bag
          </NavLink>
          <button className='cart-modal__button' onClick={() => order()}>
            check out
          </button>
        </div>
      </div>
    );
  }
}

const props = (state) => ({
  cart: state.cart,
  currency: state.currency,
  isClickCart: state.isClickCart,
});

export default connect(props, { setIsClickCart, order })(Modal);
