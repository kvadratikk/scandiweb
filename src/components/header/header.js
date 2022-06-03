import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className='header container'>
        <nav className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <NavLink to='/womwen' className='header__nav-link'>
                Women
              </NavLink>
            </li>
            <li className='header__nav-item'>
              <NavLink to='/men' className='header__nav-link'>
                Men
              </NavLink>
            </li>
            <li className='header__nav-item'>
              <NavLink to='/kids' className='header__nav-link'>
                Kids
              </NavLink>
            </li>
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
