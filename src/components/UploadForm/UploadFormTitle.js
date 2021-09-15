import React, { useState } from 'react';

const UploadFormTitle = () => {
  const [value, setValue] = useState('');

  const changeValue = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className="uploadForm-title-wrap">
      <div className="textarea-wrap">
        <textarea value={value} onChange={changeValue} placeholder="제목을 입력해 주세요."></textarea>
      </div>
    </div>
  );
};

export default UploadFormTitle;
