import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function DetailComment({ count, loadingHandler, userId }) {
  const [value, setValue] = useState('');
  const { post_id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/detailpage/comment', { comment: value, postId: post_id, userId }).then(() => loadingHandler());
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
      <div className="comment-count">댓글 {count}</div>
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
