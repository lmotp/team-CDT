import React from 'react';

import './../../../styles/layouts/video-board/info.css';

export default function ArticleInfo(props) {
  console.log(props.count);

  return (
    <div className="info">
      <span className="title">
        <i class="fas fa-volume-up speaker"></i>
        {props.name}
      </span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.views}
      </span>
      <span className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.like}
      </span>
      <span className="comment-box">
        <i class="far fa-comment-dots comment-icon"></i>
        <span class="comment-count">13</span>
      </span>
    </div>
  );
}
