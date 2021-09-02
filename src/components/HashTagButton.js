import React, { useRef } from 'react';
import { useHashTagDispatch } from '../Context';
import './style.css';

function HashTagButton({ hashTag, hashId, tagStatus }) {
  const dispatch = useHashTagDispatch();
  const buttonRef = useRef();

  const changeTagStatus = (e) => {
    e.preventDefault();
    dispatch({ type: 'TAGOFF', id: hashId });
  };

  return (
    <button ref={buttonRef} className={tagStatus ? 'onTag' : 'offTag'} onClick={changeTagStatus}>
      {hashTag}
    </button>
  );
}

export default HashTagButton;
