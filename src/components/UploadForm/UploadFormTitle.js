import React from 'react';

const UploadFormTitle = ({ changeTitleValue, titleValue }) => {
  const enterHandler = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className="uploadForm-title-wrap">
      <div className="textarea-wrap">
        <textarea
          value={titleValue}
          onKeyPress={enterHandler}
          onChange={changeTitleValue}
          placeholder="제목을 입력해 주세요."
        ></textarea>
      </div>
    </div>
  );
};

export default UploadFormTitle;
