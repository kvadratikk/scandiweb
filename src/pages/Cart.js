import React from 'react';
import { connect } from 'react-redux';

import Card from '../components/card/Card';
import { order } from '../core/redux/appSlice';
import { setCardKey, sumPrice, sumItems } from '../core/helpers/functions';

class Cart extends React.Component {
  render() {
    const { cart, currency, order } = this.props;

    return (
      <section className='cart container'>
        <h2 className='title-section--v2'>Cart</h2>

        <ul className='cart__list'>
          {(cart.length &&
            cart.map((cartProduct) => (
              <Card
                title='cart'
                key={setCardKey(cartProduct)}
                product={cartProduct}
              />
            ))) ||
            null}
        </ul>

        <div className='cart__order'>
          <div className='cart__result'>
            <p>
              Tax 21%:{' '}
              <span>
                {currency.symbol}
                {((sumPrice(cart, currency.symbol) / 100) * 21).toFixed(2)}
              </span>
            </p>
            <p>
              Quantity: <span>{sumItems(cart)}</span>
            </p>
            <p>
              Total:{' '}
              <span>
                {currency.symbol}
                {sumPrice(cart, currency.symbol)}
              </span>
            </p>
          </div>
          <button className='cart__submit' onClick={() => order()}>
            order
          </button>
        </div>
      </section>
    );
  }
}

const props = (state) => ({
  cart: state.cart,
  currency: state.currency,
});

export default connect(props, { order })(Cart);
