import React from 'react';
import { useSelector } from 'react-redux';
import './fileList.scss';
import File from './file/File';

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />);
  // const files = [{id:1, name: 'awd', type: 'dir', size: '1gb', date: '20.03.2020'},
  //   {id:2, name: 'awd2', type: 'file', size: '1gb', date: '20.03.2020'}].map(file => <File file={file} key={file.id} />)

  return (
    <div className='filelist'>
      <ul className='filelist__header'>
        <li className='filelist__name'>Название</li>
        <li className='filelist__date'>Дата</li>
        <li className='filelist__size'>Размер</li>
      </ul>
      {files}
    </div>
  );
}

export default FileList;