import React, { useState } from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/navbar-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/userReducer';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <header className='header'>
      <div className='container'>
        <img src={logo} alt='logo' className="header__logo" />
        <h1 className='header__title'>cloud-disk</h1>
        {isAuth &&
          <> 
            <input
              className='header__search'
              type="text"
              placeholder="Название файла..."
            />
            <nav className='header__navbar'>
              <span className='header__user'>user email</span>
              <button onClick={() => dispatch(logout())} className='header__link' type='button'>Выход</button>
            </nav>
          </>
        }
        {!isAuth &&
          <nav className='header__navbar'>
            <NavLink to='/login' className='header__link'>Войти</NavLink>
            <NavLink to='/registration' className='header__link'>Регистрация</NavLink>
          </nav>
        }
      </div>
    </header>
  );
};

export default Navbar;