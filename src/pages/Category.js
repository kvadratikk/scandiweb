import React from 'react';

export class Category extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <section className='category container'>
        <h2>{title}</h2>
      </section>
    );
  }
}
