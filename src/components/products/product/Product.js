import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCart, increaseAmount } from '../../../core/redux/appSlice';
import { findPrice } from '../../../core/helpers/functions';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    this.setAttributes();
  }

  setAttributes = () => {
    this.setState({
      selectedAttributes: this.props.product.attributes.map((product) => {
        return { [product.id]: product.items[0].displayValue };
      }),
    });
  };

  areAttributesEqual = () => {
    const { attributes, id } = this.props.product;
    const { cart } = this.props;
    const { selectedAttributes } = this.state;

    return cart.find(
      (product) =>
        product.id === id &&
        product.selectedAttributes.every((attribute, idx) => {
          return (
            attribute[attributes[idx].id] ===
            selectedAttributes[idx]?.[attributes[idx].id]
          );
        })
    );
  };

  addInCart = (e) => {
    e.preventDefault();
    const { product, setCart, increaseAmount } = this.props;
    const { selectedAttributes } = this.state;

    if (this.areAttributesEqual()) {
      increaseAmount({ id: product.id, selectedAttributes });
    } else {
      setCart({
        ...product,
        selectedAttributes,
        amount: 1,
      });
    }
  };

  render() {
    const { currency } = this.props;
    const { name, gallery, prices, inStock, id, brand } = this.props.product;

    return (
      <Link to={{ pathname: `${id}` }}>
        <li className={inStock ? 'product' : 'product out-of-stock'}>
          <div className='product__img-wrapper'>
            <img src={gallery[0]} alt='product' className='product__img'></img>
          </div>
          <p className='product__name'>
            {`${name} ${brand}`}
            {inStock && (
              <button
                className='product__cart'
                onClick={this.addInCart}
              ></button>
            )}
          </p>
          <p className='product__price'>{`${currency.symbol}${findPrice(
            prices,
            currency.symbol,
            1
          )}`}</p>
        </li>
      </Link>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
  cart: state.cart,
});

export default connect(props, { setCart, increaseAmount })(Product);
