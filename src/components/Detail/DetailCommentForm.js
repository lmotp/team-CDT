import React, { useState } from 'react';
import Recomment from './Recomment';
import { useCommentDispatch } from '../../Context';

function DetailCommentForm({ id, date, nickName, profileImg, heartCount, comment }) {
  const commentDispatch = useCommentDispatch();
  const [reComment, setReComment] = useState(false);
  const [changeComment, setChangeComment] = useState(false);
  const [reCommentValue, setReCommentValue] = useState('');

  // 댓글에 댓글수정하기 기능
  const reCommentHandler = () => {
    setReComment(!reComment);
  };

  // 댓글에 댓글추가하기 기능
  const changeCommentHandler = () => {
    setChangeComment(!changeComment);
  };

  const onChangeValueHandler = (e) => {
    const { value } = e.target;
    e.preventDefault();
    setReCommentValue(value);
  };

  const commentEnterHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        onSubmitHandler(e);
      }
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (reComment) {
      commentDispatch({ type: 'RECOMMENT' });
    } else if (changeComment) {
      commentDispatch({ type: 'CHANGE', id: id, changeValue: reCommentValue });
    }
    setReCommentValue('');
  };

  // 좋아요 누르기
  const likeHeartHanlder = () => {};

  return (
    <div className="comment-section-wrap">
      <img src={profileImg} alt={nickName} />
      <div className="comment-secion-content">
        <div className="content-profile">{nickName}</div>
        <p>{comment}</p>
        <div className="info-wrap">
          <span className="info-date">{date}</span>
          <sapn>
            <i className="far fa-heart heart" onClick={likeHeartHanlder}></i>
            {heartCount}
          </sapn>
          <span onClick={reCommentHandler} className={reComment ? 're-comment on' : 're-comment off'}>
            답글 쓰기
          </span>
          <span onClick={changeCommentHandler} className={changeComment ? 're-comment on' : 're-comment off'}>
            수정하기
          </span>
          {(reComment || changeComment) && (
            <div className="re-comment-form">
              <form onSubmit={onSubmitHandler}>
                <textarea
                  placeholder="Shift + Enter 누르시면은 줄 바꿈 하실수 있습니다."
                  value={reCommentValue}
                  onChange={onChangeValueHandler}
                  onKeyPress={commentEnterHandler}
                  autoFocus
                  autoComplete="off"
                />
                <button>등록</button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Recomment />
    </div>
  );
}

export default DetailCommentForm;
