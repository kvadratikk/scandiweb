import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Header from './components/header/Header';
import { NotFound } from './pages/NotFound';
import { Category } from './pages/Category';
import { Details } from './pages/Details';
import './App.scss';

import client from './core/graphql/client';
import { CATEGORIES, CURRENCIES } from './core/graphql/queries';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      currencies: [],
      currentCurrency: JSON.parse(localStorage.getItem('currency')) || null,
    };
  }

  componentDidMount = async () => {
    const { data: categoriesData } = await client.query({
      query: CATEGORIES,
    });

    const { data: currenciesData } = await client.query({
      query: CURRENCIES,
    });

    this.setState({
      categories: categoriesData.categories.map((category) => category.name),
      currencies: currenciesData.currencies,
      currentCurrency: this.state.currentCurrency
        ? this.state.currentCurrency
        : currenciesData.currencies[0],
    });
  };

  setCurrentCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
    localStorage.setItem('currency', JSON.stringify(currency));
  };

  render() {
    const { categories, currencies, currentCurrency } = this.state;

    return (
      <ApolloProvider client={client}>
        {(categories.length && (
          <BrowserRouter basename='/'>
            <Header
              categories={categories}
              currencies={currencies}
              currentCurrency={currentCurrency}
              setCurrentCurrency={this.setCurrentCurrency}
            />
            <main className='main'>
              <Routes>
                {categories.map((category, idx) => (
                  <Route
                    key={idx}
                    path={`category/${category}/:id`}
                    element={<Details currentCurrency={currentCurrency} />}
                  />
                ))}
                {categories.map((category, idx) => (
                  <Route
                    key={category[idx]}
                    path={`category/${category}`}
                    element={
                      <Category
                        title={category}
                        currentCurrency={currentCurrency}
                      />
                    }
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

export default App;
