import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { connect } from 'react-redux';

import Header from './components/header/Header';
import { NotFound } from './pages/NotFound';
import Category from './pages/Category';
import { Details } from './pages/Details';
import './App.scss';

import client from './core/graphql/client';
import { CATEGORIES, CURRENCIES } from './core/graphql/queries';

import { setCurrency, setCurrencies } from './core/redux/appSlice';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const { setCurrency, setCurrencies, currency } = this.props;

    const { data: categoriesData } = await client.query({
      query: CATEGORIES,
    });

    const { data: currenciesData } = await client.query({
      query: CURRENCIES,
    });

    this.setState({
      categories: categoriesData.categories.map((category) => category.name),
    });

    setCurrencies(currenciesData.currencies);
    if (!currency) setCurrency(currenciesData.currencies[0]);
  };

  render() {
    const { categories } = this.state;

    return (
      <ApolloProvider client={client}>
        {(categories.length && (
          <BrowserRouter basename='/'>
            <Header categories={categories} />
            <main className='main'>
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
                  element={
                    <Navigate replace to={`category/${categories[0]}`} />
                  }
                />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        )) ||
          null}
      </ApolloProvider>
    );
  }
}

const props = (state) => ({
  currency: state.currency,
});

export default connect(props, { setCurrency, setCurrencies })(App);
