import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './../../../styles/layouts/video-board/board-item.css';

import ArticleInfo from './ArticleInfo';
import axios from 'axios';

export default function BoardItem(props) {
  const [imgUrl, setImgUrl] = useState([]);

  const viewsPlus = () => {
    axios.post('/detailpage/views', { postId: props.postId });
  };

  useEffect(() => {
    if (props.content.includes('youtube')) {
      const srcMatch = props.content.match(/www.youtube.com\/embed\/([a-zA-Z0-9-_]+)?/gm);
      if (srcMatch !== null) {
        const srcJoin = srcMatch.join();
        const srcSplit = srcJoin.split('/');
        setImgUrl(srcSplit[2]);
      }
    }
  }, [props.content]);

  const date = moment(props.date).format('YYYY.MM.DD');
  return (
    <li key={props.index} className="video-list-item">
      <Link to={`/detailpage/${props.postId}`} onClick={viewsPlus}>
        <div class="video-item-thumb">
          <img src={`https://img.youtube.com/vi/${imgUrl}/mqdefault.jpg`} alt={props.alt} />
          <i class="far fa-play-circle video-play-icon"></i>
        </div>
        <p className="video-item-text">
          <span class="menu-item-color">[영상콘텐츠]</span>
          {props.title}
        </p>
        <div className="video-item-overay" aria-hidden></div>
      </Link>
      <ArticleInfo views={props.views} like={props.heart} date={date} name={props.name} count={props.count} />
    </li>
  );
}
