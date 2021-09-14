import React from 'react';
import { useHashTagDispatch } from '../../Context';

function HashTagButton({ hashTag, hashId, tagStatus }) {
  const dispatch = useHashTagDispatch();

  const changeTagStatus = (e) => {
    e.preventDefault();
    dispatch({ type: 'TAGOFF', id: hashId });
  };

  return (
    <button className={tagStatus ? 'hashButton onTag' : ' hashButton offTag'} onClick={changeTagStatus}>
      {hashTag}
    </button>
  );
}

export default HashTagButton;
