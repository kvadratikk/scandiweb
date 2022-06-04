import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Header from './components/header/Header';
import { Category } from './pages/Category';
import './App.scss';

import client from './core/graphql/client';
import { CATEGORIES } from './core/graphql/queries';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const { data } = await client.query({
      query: CATEGORIES,
    });

    this.setState({
      categories: data.categories.map((category) => category.name),
    });
  };

  render() {
    const { categories } = this.state;

    return (
      <ApolloProvider client={client}>
        <BrowserRouter basename='/'>
          <Header categories={categories} />
          <main className='main'>
            {categories.length && (
              <Routes>
                {categories.map((category, idx) => (
                  <Route
                    key={idx}
                    path={`category/${category}`}
                    element={<Category title={category} />}
                  />
                ))}
                <Route
                  path='category/:id'
                  element={<p className='container'>Not Found</p>}
                />
                <Route
                  path='/'
                  element={
                    <Navigate replace to={`category/${categories[0]}`} />
                  }
                />
              </Routes>
            )}
          </main>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
