import React from 'react';

const UploadFormTitle = ({ changeTitleValue, titleValue }) => {
  return (
    <div className="uploadForm-title-wrap">
      <div className="textarea-wrap">
        <textarea value={titleValue} onChange={changeTitleValue} placeholder="제목을 입력해 주세요."></textarea>
      </div>
    </div>
  );
};

export default UploadFormTitle;
