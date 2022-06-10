import React from 'react';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import './card.scss';

import Gallery from '../gallery/Gallery';
import Attribute from '../attribute/Attribute';

import { sortArr, findPrice } from '../../core/helpers/functions';
import { setCart, increaseAmount } from '../../core/redux/appSlice';

class CardDetails extends React.Component {
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

  setSelectedAttributes = (id, value) => {
    this.setState((prevState) => {
      return {
        selectedAttributes: prevState.selectedAttributes.map((attr) => {
          if (attr[id]) {
            return { [id]: value };
          }

          return attr;
        }),
      };
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

  handleForm = (e) => {
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
    const { name, gallery, brand, attributes, prices, description, inStock } =
      this.props.product;
    const { selectedAttributes } = this.state;

    return (
      <div className='card'>
        <Gallery gallery={gallery} />
        <form className='card__info' onSubmit={this.handleForm}>
          <h3 className='card__name'>{name}</h3>
          <p className='card__brand'>{brand}</p>
          {(attributes.length && (
            <ul className='card__attributes'>
              {attributes
                .map((attribute) => (
                  <Attribute
                    attribute={attribute}
                    key={attribute.id}
                    selectedAttributes={selectedAttributes}
                    setSelectedAttributes={this.setSelectedAttributes}
                  />
                ))
                .sort((a, b) => {
                  return sortArr(a, b, 'key');
                })}
            </ul>
          )) ||
            null}
          <h4 className='card__price-title title-attribute'>price:</h4>
          <p className='card__price'>{`${currency.symbol}${findPrice(
            prices,
            currency.symbol,
            1
          )}`}</p>
          {inStock && (
            <button className='card__order' type='submit'>
              ADD TO CART
            </button>
          )}
          <div className='card__description'>{parse(description)}</div>
        </form>
      </div>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
  cart: state.cart,
});

export default connect(props, { setCart, increaseAmount })(CardDetails);
