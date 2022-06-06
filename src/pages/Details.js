import React from 'react';

import client from '../core/graphql/client';
import { DETAILS } from '../core/graphql/queries';

import Card from '../components/card/Card';
import { NotFound } from '../pages/NotFound';

export class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      product: null,
      isNotFound: false,
    };
  }

  componentDidMount = async () => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    const { data } = await client.query({
      query: DETAILS,
      variables: { id },
    });

    data.product
      ? this.setState({ product: data.product, isNotFound: false })
      : this.setState({ product: data.product, isNotFound: true });
  };

  render() {
    const { currentCurrency } = this.props;
    const { product, isNotFound } = this.state;

    return (
      <>
        {(isNotFound && <NotFound />) || (
          <section className='details container'>
            {!isNotFound && product && (
              <Card product={product} currentCurrency={currentCurrency} />
            )}
          </section>
        )}
      </>
    );
  }
}
