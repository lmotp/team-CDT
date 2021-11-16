import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { useHistory } from 'react-router';
import axios from 'axios';

function DetailHeader({ contents, userId, postId }) {
  const { bracket, title, category, createdAt, profileImg, name, views, auth_id } = contents;
  const history = useHistory();
  const createTime = moment(createdAt).format('YYYY년 MM월 DD일 HH시 mm분');

  const changeValue = () => {
    const confirm = window.confirm('수정하겠습니까?');
    if (confirm) {
      history.push({ pathname: '/uploadform', state: { change: true, contents } });
    }
  };

  const delteValue = () => {
    const confirm = window.confirm('삭제하겠습니까?');
    if (confirm) {
      axios.post('/api/detailpage/remove', { postId, authId: auth_id }).then(() => history.push('/'));
    }
  };

  return (
    <header>
      <h2>{category}</h2>
      <h3>
        {bracket ? `[${bracket}] ` : bracket}
        {title}
      </h3>
      <div className="profile-wrap">
        {profileImg ? <img src={profileImg} alt={name} /> : <i class="far fa-user-circle user-icon"></i>}
        <div className="dates">
          <div>
            <div>{name}</div>
            <span>{createTime}</span>
            <i className="far fa-eye eye"></i>
            <span>{views}</span>
          </div>
          {auth_id === userId ? (
            <div>
              <button onClick={changeValue}>수정하기</button>
              <button onClick={delteValue}>삭제하기</button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default DetailHeader;
