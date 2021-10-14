import React from 'react';
import { Link } from 'react-router-dom';

import './../../../styles/layouts/video-board/board-item.css';

import ArticleInfo from './ArticleInfo';

export default function BoardItem(props) {
  return (
    <li key={props.index} className="video-list-item">
      <Link to="/detailpage/:post_id">
        <div class="video-item-thumb">
          <img src={process.env.PUBLIC_URL + props.img} alt={props.alt} />
          <i class="far fa-play-circle video-play-icon"></i>
        </div>
        <p className="video-item-text">
          <span class="menu-item-color">[영상콘텐츠]</span>
          {props.title}
        </p>
        <div className="video-item-overay" aria-hidden></div>
      </Link>
      <ArticleInfo eye={props.eye} like={props.heart} date={props.date} />
    </li>
  );
}
