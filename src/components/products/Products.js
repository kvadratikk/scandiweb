import React from 'react';
import Product from './product/Product';
import './products.scss';

class Products extends React.Component {
  render() {
    const { products } = this.props;

    return (
      <ul className='products'>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </ul>
    );
  }
}

export default Products;
