import React from 'react';
import './card.scss';

import CardDetails from './CardDetails';
import CardCart from './CardCart';

class Card extends React.Component {
  render() {
    const { title, product } = this.props;

    return (
      <>
        {title === 'details' ? (
          <CardDetails product={product} />
        ) : title === 'cart' ? (
          <CardCart product={product} />
        ) : null}
      </>
    );
  }
}

export default Card;
