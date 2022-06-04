import React from 'react';

class Product extends React.Component {
  render() {
    const { name, gallery, prices, inStock } = this.props.product;

    return (
      <li className={inStock ? 'product' : 'product out-of-stock'}>
        <div className='product__img-wrapper'>
          <img src={gallery[0]} alt='product' className='product__img'></img>
        </div>
        <p className='product__name'>{name}</p>
        <p className='product__price'>{`${prices.currency.symbol}${prices.amount}`}</p>
      </li>
    );
  }
}

export default Product;
