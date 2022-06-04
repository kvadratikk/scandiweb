import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Header from './components/header/Header';
import { Category } from './pages/Category';
import './App.scss';

import client from './core/graphql/client';
import { CATEGORIES, CURRENCIES } from './core/graphql/queries';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      currencies: [],
      currentCurrency: {},
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
      currentCurrency: currenciesData.currencies[0],
    });
  };

  setCurrentCurrency = (currency) => {
    this.setState({ currentCurrency: currency });
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
                <Route
                  path='*'
                  element={<p className='container'>Not Found</p>}
                />
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
