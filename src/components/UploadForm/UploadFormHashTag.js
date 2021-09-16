import React, { useState } from 'react';
import { useUploadDispatch, useUploadState } from '../../Context';
import UploadFormHashTagValue from './part/UploadFormHashTagValue';

const UploadFormHashTag = () => {
  const [value, setValue] = useState('');
  const dispatch = useUploadDispatch();
  const state = useUploadState();

  const spaceControl = (e) => {
    if (value === '') {
      e.preventDefault();
    } else if (e.code === 'Space') {
      e.preventDefault();
      dispatch({ type: 'HASHTAG_ADD', id: state.length + 1, value });
      setValue('');
    }
  };

  const hashTagChangeHanlder = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (value !== '') {
      dispatch({ type: 'HASHTAG_ADD', id: state.length + 1, value });
      setValue('');
    }
  };

  return (
    <div className="hashTag-wrap">
      {state.length > 0 && (
        <div className="upload-hashTag-box">
          {state.map((v) => (
            <UploadFormHashTagValue key={v.id} v={v} dispatch={dispatch} />
          ))}
        </div>
      )}

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="#태그 입력 : 6자 이내 뛰어쓰기 시 해쉬태그 적용"
          value={value}
          onChange={hashTagChangeHanlder}
          onKeyDown={spaceControl}
          maxLength="6"
        />
      </form>
    </div>
  );
};

export default UploadFormHashTag;
