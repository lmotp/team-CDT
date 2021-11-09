import React, { useState, useEffect } from 'react';

import './../../styles/layouts/board-item.css';

import ArticleInfo from './ArticleInfo';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BoardItem(props) {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (props.content.includes('img')) {
      const imgSrcMatch = props.content.match(/src[^]+[\\"]/gm);
      if (imgSrcMatch !== null) {
        const imgSrcJoin = imgSrcMatch.join();
        const imgSrcSplit = imgSrcJoin.split('"');
        setImgUrl(imgSrcSplit[1]);
      }
    }
  }, [props.content]);

  const viewsPlus = () => {
    axios.post('/api/detailpage/views', { postId: props.postId });
  };

  return (
    <li className="main-news-list-item">
      <Link to={`/detailpage/${props.postId}`} onClick={viewsPlus}>
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
        name={props.name}
        views={props.views}
        heart={props.heart}
        date={moment(props.date).format('YYYY년 MM월 DD일')}
      ></ArticleInfo>
    </li>
  );
}
