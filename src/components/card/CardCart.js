import React from 'react';
import { connect } from 'react-redux';
import './card.scss';

import Attribute from '../attribute/Attribute';

import { sortArr, findPrice } from '../../core/helpers/functions';
import { setCart } from '../../core/redux/appSlice';
import { increaseAmount, decreaseAmount } from '../../core/redux/appSlice';

class CardCart extends React.Component {
  constructor() {
    super();
    this.state = {
      currentImg: 0,
    };
  }

  clickRight = () => {
    if (this.state.currentImg < this.props.product.gallery.length - 1) {
      this.setState((prevState) => {
        return {
          currentImg: prevState.currentImg + 1,
        };
      });
    } else {
      this.setState({ currentImg: 0 });
    }
  };

  clickLeft = () => {
    if (this.state.currentImg > 0) {
      this.setState((prevState) => {
        return {
          currentImg: prevState.currentImg - 1,
        };
      });
    } else {
      this.setState({ currentImg: this.props.product.gallery.length - 1 });
    }
  };

  render() {
    const { currency, increaseAmount, decreaseAmount } = this.props;
    const {
      name,
      gallery,
      brand,
      attributes,
      prices,
      selectedAttributes,
      amount,
      id,
    } = this.props.product;
    const { currentImg } = this.state;

    return (
      <li className='cart__item'>
        <div className='cart__info'>
          <h3 className='card__name'>{name}</h3>
          <p className='card__brand cart__brand'>{brand}</p>
          <p className='card__price'>{`${currency.symbol}${findPrice(
            prices,
            currency.symbol
          )}`}</p>
          {(attributes.length && (
            <ul className='card__attributes cart__attributes'>
              {attributes
                .map((attribute) => (
                  <Attribute
                    attribute={attribute}
                    key={attribute.id}
                    selectedAttributes={selectedAttributes}
                  />
                ))
                .sort((a, b) => {
                  return sortArr(a, b, 'key');
                })}
            </ul>
          )) ||
            null}
        </div>

        <div className='cart__other'>
          <div className='cart__amount'>
            <button
              className='cart__plus'
              onClick={() => increaseAmount({ id, selectedAttributes })}
            >
              +
            </button>
            {amount}
            <button
              className='cart__minus'
              onClick={() => decreaseAmount({ id, selectedAttributes })}
            >
              -
            </button>
          </div>
          <img className='cart__img' src={gallery[currentImg]} alt='product' />
          {gallery.length > 1 && (
            <div className='cart__buttons'>
              <button
                className='cart__button'
                onClick={this.clickLeft}
              ></button>
              <button
                className='cart__button'
                onClick={this.clickRight}
              ></button>
            </div>
          )}
        </div>
      </li>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
});

export default connect(props, { setCart, increaseAmount, decreaseAmount })(
  CardCart
);
