import React, { useState } from 'react';
import slide5 from '../../images/bback.jpg';
import { useCommentDispatch, useCommentState } from '../../Context';

function DetailComment() {
  const dispatch = useCommentDispatch();
  const state = useCommentState();
  const [value, setValue] = useState('');

  const content = [
    {
      id: state.length + 1,
      profileImg: slide5,
      nickName: '나는차가좋아',
      heartCount: 3,
      comment: value,
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: 'COMMENT', content: content });
    setValue('');
  };

  const onChangeValueHandler = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);
  };

  const commentEnterHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        submitHandler(e);
      }
    }
  };
  return (
    <div className="comment-wrap">
      <div className="comment-count">댓글 {state.length}</div>
      <div className="comment-wrap-form">
        <form onSubmit={submitHandler}>
          <textarea
            value={value}
            onChange={onChangeValueHandler}
            onKeyPress={commentEnterHandler}
            placeholder="Shift + Enter 누르시면은 줄 바꿈 하실수 있습니다."
          />
          <button>등록</button>
        </form>
      </div>
    </div>
  );
}

export default DetailComment;
