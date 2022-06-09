import React from 'react';
import './attribute.scss';

class Attribute extends React.Component {
  render() {
    const { attribute, setSelectedAttributes, selectedAttributes } = this.props;

    return (
      <li className='attribute'>
        <h4 className='attribute__name title-attribute'>
          {`${attribute.name}:`}
        </h4>
        <div className='attribute__items'>
          {attribute.items.map((item) => (
            <label
              className={`attribute__item ${
                (attribute.type === 'swatch' && 'swatch') || ''
              } ${
                (selectedAttributes.find(
                  (selectedAttribute) =>
                    selectedAttribute[attribute.id] === item.displayValue
                ) &&
                  'active') ||
                ''
              } ${setSelectedAttributes ? 'details-item' : 'cart-item'}`}
              key={item.id}
              style={
                (attribute.type === 'swatch' && {
                  background: item.value,
                }) ||
                null
              }
            >
              {attribute.type === 'swatch' ? '' : item.value}
              <input
                className='attribute__input'
                type='radio'
                value={item.displayValue}
                name={attribute.id}
                onClick={() => {
                  setSelectedAttributes &&
                    setSelectedAttributes(attribute.id, item.displayValue);
                }}
              />
            </label>
          ))}
        </div>
      </li>
    );
  }
}

export default Attribute;
