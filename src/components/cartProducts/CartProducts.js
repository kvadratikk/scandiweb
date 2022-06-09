import React from 'react';
import { connect } from 'react-redux';

import Card from '../card/Card';

class CartProducts extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <ul className='cart__list'>
        {cart.length &&
          cart.map((cartProduct) => (
            <Card
              title='cart'
              key={cartProduct.selectedAttributes
                .map((product) => Object.values(product))
                .toString()}
              product={cartProduct}
            />
          ))}
      </ul>
    );
  }
}

const props = (state) => ({
  cart: state.cart,
});

export default connect(props)(CartProducts);
