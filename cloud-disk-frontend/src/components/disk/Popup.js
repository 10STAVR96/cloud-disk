import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupOpened } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input';

const Popup = () => {
  const [dirName, setDirName] = useState('');
  const popupOpened = useSelector(state => state.files.popupOpened);
  const currentDir = useSelector(state => state.files.currentDir);
  const dispatch = useDispatch();

  const closePopupHandler = () => {
    dispatch(setPopupOpened(false));
    setDirName('');
  }
  const createDirHandler = (e) => {
    e.preventDefault();
    dispatch(createDir(currentDir, dirName));
    setDirName('');
    closePopupHandler();
  }

  return (
    <div onClick={closePopupHandler} className={popupOpened ? 'popup popup_opened' : 'popup'}>
      <form onSubmit={createDirHandler} onClick={(e => e.stopPropagation())} className='popup__container'>
        <div className='popup__header'>
          <h3 className='popup__title'>Создание папки</h3>
          <button className='popup__close' onClick={closePopupHandler} type='button'>X</button>
        </div>
        <Input type='text' placeholder='Введите название папки...' value={dirName} setValue={setDirName} />
        <button className='popup__submit' type='submit'>Создать</button>
      </form>
    </div>
  );
};

export default Popup;