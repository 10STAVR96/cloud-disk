import axios from 'axios';
import {API_URL} from '../config';
import { addFile, setFiles } from '../reducers/fileReducer';

export const getFiles = (dirId) => {
  return async dispatch => {
    try {
      const response = await axios.get(`${API_URL}/files${dirId ? '?parent='+dirId : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}
export const createDir = (dirId, name) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}/files`, {
        name,
        parent: dirId,
        type: 'dir'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      dispatch(addFile(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  }
}