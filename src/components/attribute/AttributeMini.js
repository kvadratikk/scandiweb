import React from 'react';
import './attribute.scss';

class AttributeMini extends React.Component {
  render() {
    const { attribute, selectedAttributes } = this.props;

    return (
      <li className='attribute attribute-mini'>
        <h4 className='attribute-mini__name'>{`${attribute.name}:`}</h4>
        <div className='attribute__items attribute-mini__items'>
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
              } attribute-mini__item`}
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
              />
            </label>
          ))}
        </div>
      </li>
    );
  }
}

export default AttributeMini;
