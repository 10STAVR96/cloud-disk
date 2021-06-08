import axios from 'axios';
import {API_URL} from '../config';
import { setUser } from '../reducers/userReducer';

export const registration = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};
export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.response.data.message);
    }
  }
};
export const auth = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}/auth`,
        { headers: {Authorization:`Bearer ${localStorage.getItem('token')}`}}
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      localStorage.removeItem('token');
    }
  }
};