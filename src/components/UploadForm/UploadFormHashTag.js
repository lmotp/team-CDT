import React, { useEffect, useState } from 'react';
import { useUploadDispatch, useUploadState } from '../../Context';
import UploadFormHashTagValue from './part/UploadFormHashTagValue';

const UploadFormHashTag = ({ hashTag }) => {
  const [value, setValue] = useState('');
  const dispatch = useUploadDispatch();
  const state = useUploadState();

  const spaceControl = (e) => {
    if (value === '' && e.code === 'Space') {
      e.preventDefault();
    } else if (state.length < 7 && value !== '' && e.code === 'Space') {
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
    if (state.length < 7 && value !== '') {
      dispatch({ type: 'HASHTAG_ADD', id: state.length + 1, value });
      setValue('');
    }
  };

  useEffect(() => {
    if (hashTag) {
      const hashTagSplit = hashTag?.split(',');
      const length = hashTagSplit?.map((v, i) => i);

      for (let i = 0; i < hashTagSplit.length; i++) {
        dispatch({ type: 'HASHTAG_ADD', id: length[i], value: hashTagSplit[i] });
      }
    }
  }, [dispatch, hashTag]);

  return (
    <div className="hashTag-wrap">
      {state.length > 0 && (
        <div className="upload-hashTag-box">
          {state.map((v, i) => (
            <UploadFormHashTagValue key={i} v={v} dispatch={dispatch} hashTag={hashTag} />
          ))}
        </div>
      )}
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="#태그 입력 : 6자 이내 뛰어쓰기 시 해쉬태그 적용"
          value={value}
          onChange={hashTagChangeHanlder}
          onKeyPress={spaceControl}
          maxLength="6"
        />
      </form>
    </div>
  );
};

export default UploadFormHashTag;
