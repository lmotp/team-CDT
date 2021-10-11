import React from 'react';

import './../../../styles/layouts/notice-board/board-item.css';

import ArticleInfo from './ArticleInfo';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

export default function BoardItem(props) {
  console.log(props.count);
  return (
    <li className="main-news-list-item">
      <Link to={`/detailpage/${props.postId}`}>
        <p>
          <span class="menu-color">{props.bracket ? `[${props.bracket}]` : null}</span>
          {props.title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          <img className="thumb-img" src={props.thumb} alt="주요소식 안내드립니다" />
        </div>
        <div className="comment">
          <i class="far fa-comment-dots comment-icon"></i>
          <p class="comment-number">{props.count}</p>
        </div>
      </Link>
      <ArticleInfo
        nickName={props.nickName}
        eye={props.eye}
        heart={props.heart}
        date={moment(props.date).format('YYYY년 MM월 DD일')}
      ></ArticleInfo>
    </li>
  );
}
