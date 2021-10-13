import React from 'react';
import moment from 'moment';
import 'moment/locale/ko';

function DetailHeader({ contents }) {
  const { bracket, title, category, createdAt, img, nickname, views } = contents;
  const createTime = moment(createdAt).format('YYYY년 MM월 DD일 HH시 mm분');
  return (
    <header>
      <h2>{category}</h2>
      <h3>
        {bracket ? `[${bracket}]` : bracket}&nbsp;
        {title}
      </h3>
      <div className="profile-wrap">
        <img src={img} alt={nickname} />
        <div className="date">
          <div>{nickname}</div>
          <span>{createTime}</span>
          <i className="far fa-eye eye"></i>
          <span>{views}</span>
        </div>
      </div>
    </header>
  );
}

export default DetailHeader;
