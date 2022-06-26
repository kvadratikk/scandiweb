import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import client from './core/graphql/client';
import { Provider } from 'react-redux';
import store from './core/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store()}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
