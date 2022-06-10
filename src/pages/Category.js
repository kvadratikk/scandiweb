import React from 'react';

import client from '../core/graphql/client';
import { PRODUCTS } from '../core/graphql/queries';

import Products from '../components/products/Products';

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      amount: 6,
      products: [],
    };
  }

  componentDidMount = async () => {
    await this.requestProducts();
    document.addEventListener('scroll', this.scroll);
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.scroll);
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
      products,
    });
  };

  scroll = () => {
    const { products, amount } = this.state;

    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const threshold = height - screenHeight / 6;
    const position = scrolled + screenHeight;

    if (position >= threshold && amount <= products.length) {
      this.setState({ amount: amount + 6 });
    }
  };

  render() {
    const { products, name, amount } = this.state;

    return (
      <section className='category container'>
        <h2 className='title-section'>{name}</h2>

        <Products products={products.slice(0, amount)} />
      </section>
    );
  }
}

export default Category;
