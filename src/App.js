import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/header/Header';
import Main from './components/main/Main';
import './App.scss';

import { CATEGORIES, CURRENCIES } from './core/graphql/queries';
import client from './core/graphql/client';
import {
  setCurrency,
  setCurrencies,
  setCategories,
} from './core/redux/appSlice';

class App extends React.Component {
  constructor() {
    super();
    this.elements = {
      btn: React.createRef(),
      cart: React.createRef(),
      modal: React.createRef(),
      currencies: React.createRef(),
    };
  }

  componentDidMount = async () => {
    const { setCurrency, setCurrencies, currency, setCategories } = this.props;

    const { data: categoriesData } = await client.query({
      query: CATEGORIES,
    });

    const { data: currenciesData } = await client.query({
      query: CURRENCIES,
    });

    setCategories(categoriesData.categories.map((category) => category.name));
    setCurrencies(currenciesData.currencies);
    if (!currency) setCurrency(currenciesData.currencies[0]);
  };

  componentDidUpdate() {
    if (this.props.isClickCart) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <>
        {(categories.length && (
          <BrowserRouter basename='/'>
            <Header elements={this.elements} />
            <Main elements={this.elements} />
          </BrowserRouter>
        )) || (
          <div className='spinner'>
            <span>loading</span>
          </div>
        )}
      </>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
  categories: state.categories,
  isClickCart: state.isClickCart,
});

export default connect(props, { setCurrency, setCurrencies, setCategories })(
  App
);
