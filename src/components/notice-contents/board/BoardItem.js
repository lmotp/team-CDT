import React, { useState, useEffect } from 'react';

import './../../../styles/layouts/notice-board/board-item.css';

import ArticleInfo from './ArticleInfo';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

export default function BoardItem(props) {
  const [imgUrl, setImgUrl] = useState([]);
  useEffect(() => {
    const imgSrcMatch = props.content.match(/image[^]+[\\"]/gm);
    if (props.content.includes('img')) {
      const imgSrcJoin = imgSrcMatch.join();
      const imgSrcSplit = imgSrcJoin.split('" ');
      setImgUrl(imgSrcSplit[0]);
    }
  }, [props.content]);

  console.log(imgUrl);

  return (
    <li className="main-news-list-item">
      <Link to={`/detailpage/${props.postId}`}>
        <p>
          <span style={{ color: 'burlywood' }}>[{props.category}]</span>&nbsp;
          <span class="menu-color">{props.bracket ? `[${props.bracket}]` : null}</span>
          {props.title}
          <span className="new-icon"></span>
        </p>
        <div className="thumb">
          {props.content.includes('img') ? (
            <img className="thumb-img" src={imgUrl} alt="주요소식 안내드립니다" />
          ) : null}
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
