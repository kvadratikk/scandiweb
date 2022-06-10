import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from '../../pages/NotFound';
import Details from '../../pages/Details';
import Category from '../../pages/Category';
import Modal from '../modal/Modal';
import Cart from '../../pages/Cart';

class Main extends React.Component {
  render() {
    const { categories, isClickCart, elements } = this.props;

    return (
      <main className='main'>
        {isClickCart && <div className='back'></div>}
        {isClickCart && (
          <div className='container cart-modal__wrapper'>
            <Modal element={elements.modal} />
          </div>
        )}
        <Routes>
          {categories.map((category, idx) => (
            <Route
              key={idx}
              path={`category/${category}/:id`}
              element={<Details />}
            />
          ))}
          {categories.map((category, idx) => (
            <Route
              key={category[idx]}
              path={`category/${category}`}
              element={<Category title={category} />}
            />
          ))}
          <Route
            path='/'
            element={<Navigate replace to={`category/${categories[0]}`} />}
          />
          <Route path='cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    );
  }
}

const props = (state) => ({
  categories: state.categories,
  isClickCart: state.isClickCart,
});

export default connect(props)(Main);
