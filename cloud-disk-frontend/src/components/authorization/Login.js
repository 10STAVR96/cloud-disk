import React, { useState } from 'react';
import './authorization.scss';
import { useDispatch } from 'react-redux';
import Input from '../../utils/input/Input';
import { login } from '../../actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignin = (e) => {
    e.preventDefault();
    
    dispatch(login(email, password));
  };

  return (
    <form onSubmit={handleSignin} className='authorization'>
      <h2 className='authorization__header'>Авторизация</h2>
      <Input value={email} setValue={setEmail} type='text' placeholder='Введите почту...' />
      <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль...' />
      <button className='authorization__submit' type='submit'>Войти</button>
    </form>
  );
};

export default Login;