import React from 'react';
import { connect } from 'react-redux';
import './card-mini.scss';

import AttributeMini from '../attribute/AttributeMini';

import { sortArr, findPrice } from '../../core/helpers/functions';
import { setCart } from '../../core/redux/appSlice';
import { increaseAmount, decreaseAmount } from '../../core/redux/appSlice';

class CardMini extends React.Component {
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

    return (
      <li className='cart-modal__item'>
        <div className='cart__info cart-modal__info'>
          <h3 className='cart-modal__name'>{name}</h3>
          <p className='cart-modal__brand'>{brand}</p>
          <p className='cart-modal__price'>{`${currency.symbol}${findPrice(
            prices,
            currency.symbol,
            amount
          )}`}</p>
          {(attributes.length && (
            <ul className='card__attributes cart__attributes'>
              {attributes
                .map((attribute) => (
                  <AttributeMini
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

        <div className='cart__other cart-modal__other'>
          <div className='cart__amount cart-modal__amount'>
            <button
              className='cart__plus cart-modal__plus'
              onClick={() => increaseAmount({ id, selectedAttributes })}
            ></button>
            {amount}
            <button
              className='cart__minus cart-modal__minus'
              onClick={() => decreaseAmount({ id, selectedAttributes })}
            ></button>
          </div>
          <img
            className='cart__img cart-modal__img'
            src={gallery[0]}
            alt='product'
          />
        </div>
      </li>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
});

export default connect(props, { setCart, increaseAmount, decreaseAmount })(
  CardMini
);
