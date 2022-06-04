import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import './header.scss';

class Header extends React.Component {
  render() {
    const { categories } = this.props;

    return (
      <header className='header container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            {categories.map((category, idx) => (
              <li className='header__nav-item' key={idx}>
                <NavLink
                  to={`category/${category}`}
                  className='header__nav-link'
                >
                  {category}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <NavLink className='header__logo' to='/'>
          <img src={logo} alt='logo'></img>
        </NavLink>
        <div className='header__other'>
          <button className='header__currency'>$</button>
          <button className='header__cart'></button>
        </div>
      </header>
    );
  }
}

export default Header;
