import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

class App {
  render() {
    return (
      <BrowserRouter basename='/'>
        <header></header>
        <main>
          <Routes>
            {/* <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    );
  }
}

export default App;
