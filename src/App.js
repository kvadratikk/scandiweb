import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename='/'>
        <Header />
        <main className='main'>
          <Routes>
            {/* <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
