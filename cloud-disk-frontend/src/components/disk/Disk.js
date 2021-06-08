import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './disk.scss';
import { createDir, getFiles } from '../../actions/file';
import { setPopupOpened } from '../../reducers/fileReducer';
import FileList from './fileList/FileList';
import Popup from './Popup';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  const openPopupHandler = () => {
    // console.log(currentDir);
    // dispatch(createDir(currentDir, 'awdwada'));
    dispatch(setPopupOpened(true));
  };

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);
  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back' type='button'/>
        <button onClick={openPopupHandler} className='disk__create' type='button'>Создать папку</button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
}

export default Disk;