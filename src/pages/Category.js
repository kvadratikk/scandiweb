import React from 'react';

import client from '../core/graphql/client';
import { PRODUCTS } from '../core/graphql/queries';

import Products from '../components/products/Products';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      products: [],
    };
  }

  componentDidMount = async () => {
    await this.requestProducts();
  };

  componentDidUpdate = async (prevProps) => {
    const { title } = this.props;
    if (title !== prevProps.title) await this.requestProducts();
  };

  requestProducts = async () => {
    const { data } = await client.query({
      query: PRODUCTS,
      variables: { title: this.props.title },
    });

    const { name, products } = data.category;

    this.setState({
      name,
      products: products.map((product) => {
        return {
          ...product,
          gallery: product.gallery[0],
        };
      }),
    });
  };

  render() {
    const { products, name } = this.state;

    return (
      <section className='category container'>
        <h2 className='title-section'>{name}</h2>

        <Products products={products} />
      </section>
    );
  }
}

export default Category;
