import React from 'react';

import './../../../styles/layouts/notice-board/info.css';

export default function ArticleInfo(props) {
  return (
    <div className="info">
      <span className="title">{props.nickName}</span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.eye}
      </span>
      <span className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.heart}
      </span>
    </div>
  );
}
