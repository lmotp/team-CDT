import React, { useState } from 'react';

import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';
import dompurify from 'dompurify';

function DetailCommentForm({
  id,
  recommentId,
  createdAt,
  name,
  profileImg,
  comment,
  on,
  loadingHandler,
  userId,
  authId,
}) {
  const [reComment, setReComment] = useState(false);
  const [changeComment, setChangeComment] = useState(false);
  const [reCommentValue, setReCommentValue] = useState('');
  const createTime = moment(createdAt).format('YYYY년 MM월 DD일 HH시 mm분');

  // 댓글에 댓글추가하기 기능
  const reCommentHandler = () => {
    setChangeComment(false);
    setReComment(!reComment);
  };

  // 댓글에 댓글수정하기 기능
  const changeCommentHandler = () => {
    setReComment(false);
    setChangeComment(!changeComment);
    setReCommentValue(comment);
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

  // 댓글 삭제하기
  const deleteCommentHandler = () => {
    const confirm = window.confirm('삭제하겠습니까?');
    if (confirm) {
      axios
        .post('/detailpage/recomment/list/remove', { commentId: id, authId, recommentId, on })
        .then(() => loadingHandler());
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!reCommentValue) {
      alert('내용을 입력해주세요');
      return;
    }
    if (reComment) {
      axios
        .post('/detailpage/recomment', { reComment: reCommentValue, commentId: id, userId })
        .then(() => loadingHandler());
    } else if (changeComment) {
      const confirm = window.confirm('수정하겠습니까?');
      if (confirm) {
        axios
          .post('/detailpage/recomment/list/change', { commentId: id, authId, recommentId, on, reCommentValue })
          .then(() => loadingHandler());
      }
    }
    setReComment(false);
    setChangeComment(false);
    setReCommentValue('');
  };

  const dangerComment = comment.replace(/\\n/g, '<br/>');

  return (
    <div className={on ? 'comment-section-wrap on' : 'comment-section-wrap'}>
      {profileImg ? <img src={profileImg} alt={name} /> : <i class="far fa-user-circle user-icon"></i>}
      <div className="comment-secion-content">
        <div className="content-profile">{name}</div>
        <p dangerouslySetInnerHTML={{ __html: dompurify.sanitize(dangerComment) }}></p>
        <div className="info-wrap">
          <span className="info-date">{createTime}</span>
          {!on && (
            <span onClick={reCommentHandler} className={reComment ? 're-comment on' : 're-comment off'}>
              답글 쓰기
            </span>
          )}
          {userId === authId ? (
            <span className="control-box">
              <span onClick={changeCommentHandler} className={changeComment ? 're-comment on' : 're-comment off'}>
                수정하기
              </span>
              <span onClick={deleteCommentHandler} style={{ cursor: 'pointer' }}>
                &nbsp; 삭제하기
              </span>
            </span>
          ) : null}

          {(reComment || changeComment) && (
            <div className={!on ? 're-comment-form' : 're-comment-form on'}>
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
    </div>
  );
}

export default DetailCommentForm;
