import React from 'react';

const UploadFormHashTagValue = ({ v, dispatch, hashTag }) => {
  const delteHashTag = () => {
    dispatch({ type: 'HASHTAG_DELTE', id: v.id });
  };
  console.log(hashTag);

  return (
    <div className="value-wrap" key={v.id}>
      <span>{v.value}</span>
      <button onClick={delteHashTag}>
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
  );
};

export default UploadFormHashTagValue;
