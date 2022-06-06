import React from 'react';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    const { currentCurrency } = this.props;
    const { name, gallery, prices, inStock, id } = this.props.product;

    return (
      <Link to={{ pathname: `${id}` }}>
        <li className={inStock ? 'product' : 'product out-of-stock'}>
          <div className='product__img-wrapper'>
            <img src={gallery} alt='product' className='product__img'></img>
          </div>
          <p className='product__name'>{name}</p>
          <p className='product__price'>{`${currentCurrency.symbol}${
            prices.find(
              (price) => price.currency.symbol === currentCurrency.symbol
            ).amount
          }`}</p>
        </li>
      </Link>
    );
  }
}

export default Product;
