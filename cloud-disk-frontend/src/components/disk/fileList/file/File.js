import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/dir.svg';
import fileLogo from '../../../../assets/img/file.svg'

const File = ({file}) => {
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt='dirLogo' className='file__img'/>
      <span className='file__name'>{file.name}</span>
      <span className='file__date'>{file.date.slice(0, 10)}</span>
      <span className='file__size'>{file.size}</span>
    </div>
  );
}

export default File;