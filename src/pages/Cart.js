import React from 'react';
import { connect } from 'react-redux';

import CartProducts from '../components/cartProducts/CartProducts';

class Cart extends React.Component {
  render() {
    const { cart, currency } = this.props;

    return (
      <section className='cart container'>
        <h2 className='title-section--v2'>Cart</h2>

        <CartProducts />

        <div className='cart__order'>
          <div className='cart__result'>
            <p>
              Tax 21%:{' '}
              <span>
                {currency.symbol}
                {(cart.reduce(
                  (a, b) =>
                    a +
                    b.prices.find(
                      (price) => price.currency.symbol === currency.symbol
                    ).amount,
                  0
                ) /
                  100) *
                  21}
              </span>
            </p>
            <p>
              Quantity: <span>{cart.reduce((a, b) => a + b.amount, 0)}</span>
            </p>
            <p>
              Total:{' '}
              <span>
                {currency.symbol}
                {cart.reduce(
                  (a, b) =>
                    a +
                    b.prices.find(
                      (price) => price.currency.symbol === currency.symbol
                    ).amount,
                  0
                )}
              </span>
            </p>
          </div>
          <button className='cart__submit'>order</button>
        </div>
      </section>
    );
  }
}

const props = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(props)(Cart);
