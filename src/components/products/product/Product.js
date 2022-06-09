import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Product extends React.Component {
  render() {
    const { currency } = this.props;
    const { name, gallery, prices, inStock, id, brand } = this.props.product;

    return (
      <Link to={{ pathname: `${id}` }}>
        <li className={inStock ? 'product' : 'product out-of-stock'}>
          <div className='product__img-wrapper'>
            <img src={gallery} alt='product' className='product__img'></img>
          </div>
          <p className='product__name'>{`${name} ${brand}`}</p>
          <p className='product__price'>{`${currency.symbol}${
            prices.find((price) => price.currency.symbol === currency.symbol)
              .amount
          }`}</p>
        </li>
      </Link>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
});

export default connect(props)(Product);
