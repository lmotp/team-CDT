import React, { useState } from 'react';

const UploadFormCotent = () => {
  const [value, setValue] = useState('');
  const [placeholderStatus, setPlaceholderStatus] = useState(true);
  const valueChange = (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      setPlaceholderStatus(false);
    } else {
      setPlaceholderStatus(true);
    }
    setValue(value);
  };
  return (
    <div className="content-wrap">
      {placeholderStatus && (
        <div className="content-placeholder">
          명예 훼손, 허위 정보, 비정상 플레이 유포 등 법률, 약관, 운영정책을 위반하는 게시글 등록 시 이용이 제한될 수
          있습니다.<br></br>
          게시글 작성 시 소중한 개인정보를 포함하지 않도록 주의 부탁 드립니다.
        </div>
      )}
      <textarea value={value} onChange={valueChange}></textarea>
      <div className="content-edittalbe">
        <p>{value}</p>
        <b>안녕하세요</b>
      </div>
    </div>
  );
};

export default UploadFormCotent;
