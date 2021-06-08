import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './app.scss';
import Disk from './disk/Disk';
import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../actions/user';

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <main className='main'>
        {!isAuth ?
          <Switch>
            <Route path='/registration' component={Registration}/>
            <Route path='/login' component={Login}/>
            <Redirect to='/login'/>
          </Switch>
          :
          <Switch>
            <Route exact path='/' component={Disk}/>
            <Redirect to='/'/>
          </Switch>
        }
      </main>
    </BrowserRouter>
  );
}

export default App;
