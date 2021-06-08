import React, { useState } from 'react';
import './authorization.scss';
import Input from '../../utils/input/Input';
import { registration } from '../../actions/user';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    
    registration(email, password);
  };

  return (
    <form onSubmit={handleSignup} className='authorization'>
      <h2 className='authorization__header'>Регистрация</h2>
      <Input value={email} setValue={setEmail} type='text' placeholder='Введите почту...' />
      <Input value={password} setValue={setPassword} type='password' placeholder='Введите пароль...' />
      <button className='authorization__submit' type='submit'>Зарегистрироваться</button>
    </form>
  );
};

export default Registration;