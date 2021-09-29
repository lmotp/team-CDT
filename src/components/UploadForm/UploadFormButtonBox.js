import React from 'react';

const UploadFormButtonBox = ({ cancelClick, uploadClick }) => {
  return (
    <div className="button-box">
      <button onClick={cancelClick} className="button-cancel">
        취소
      </button>
      <button onClick={uploadClick}>등록</button>
    </div>
  );
};

export default UploadFormButtonBox;
