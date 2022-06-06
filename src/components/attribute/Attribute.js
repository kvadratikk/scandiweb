import React from 'react';
import './attribute.scss';

class Attribute extends React.Component {
  constructor() {
    super();
    this.state = {
      activeValue: '',
    };
  }

  render() {
    const { attribute } = this.props;
    const { activeValue } = this.state;

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
              } ${(activeValue === item.displayValue && 'active') || ''}`}
              key={item.id}
              style={
                (attribute.type === 'swatch' && {
                  background: item.value,
                }) ||
                null
              }
              onChange={() => {
                this.setState({ activeValue: item.displayValue });
              }}
            >
              {attribute.type === 'swatch' ? '' : item.value}
              <input
                className='attribute__input'
                type='radio'
                value={item.displayValue}
                name={attribute.id}
              />
            </label>
          ))}
        </div>
      </li>
    );
  }
}

export default Attribute;
