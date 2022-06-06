import React from 'react';
import Product from './product/Product';
import './products.scss';

class Products extends React.Component {
  render() {
    const { products, currentCurrency } = this.props;

    return (
      <ul className='products'>
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            currentCurrency={currentCurrency}
          />
        ))}
      </ul>
    );
  }
}

export default Products;
