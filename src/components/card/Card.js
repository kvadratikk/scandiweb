import React from 'react';
import parse from 'html-react-parser';
import './card.scss';

import Gallery from '../gallery/Gallery';
import Attribute from '../attribute/Attribute';

import { sortArr, findPrice } from '../../core/helpers/functions';

class Card extends React.Component {
  render() {
    const { symbol } = this.props.currentCurrency;
    const { name, gallery, brand, attributes, prices, description } =
      this.props.product;

    return (
      <div className='card'>
        <Gallery gallery={gallery} />
        <form className='card__info'>
          <h3 className='card__name'>{name}</h3>
          <p className='card__brand'>{brand}</p>
          {(attributes.length && (
            <ul className='card__attributes'>
              {attributes
                .map((attribute) => (
                  <Attribute attribute={attribute} key={attribute.id} />
                ))
                .sort((a, b) => {
                  return sortArr(a, b, 'key');
                })}
            </ul>
          )) ||
            null}
          <h4 className='card__price-title title-attribute'>price:</h4>
          <p className='card__price'>{`${symbol}${findPrice(
            prices,
            symbol
          )}`}</p>
          <button className='card__order' type='submit'>
            ADD TO CART
          </button>
          <div className='card__description'>{parse(description)}</div>
        </form>
      </div>
    );
  }
}

export default Card;
