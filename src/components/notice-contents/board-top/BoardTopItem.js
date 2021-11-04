import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './../../../styles/layouts/notice-board/board-top-item.css';
import event from '../../../images/event.png';

import ArticleInfo from './ArticleInfo';
import moment from 'moment';

export default function BoardTopItem(props) {
  const [imgUrl, setImgUrl] = useState([]);

  const viewsPlus = () => {
    axios.post('/detailpage/views', { postId: props.postId });
  };

  const date = moment(props.createdAt).format('YYYY.MM.DD HH:mm');

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

  return (
    <Link to={`/detailpage/${props.postId}`} onClick={viewsPlus}>
      <li className="board-top-list-item">
        <div>
          <p>
            <span class="menu-color">{`[${props.category}]`}</span>
            {props.title}
          </p>
          <ArticleInfo eye={props.eye} like={props.heart} date={date}></ArticleInfo>
        </div>

        <div className="board-top-thumb">
          {props.content.includes('img') ? (
            <img className="board-top-thumb-img" src={imgUrl} alt="주요소식 안내드립니다" />
          ) : (
            <img className="board-top-thumb-img" src={event} alt="주요소식 안내드립니다" />
          )}
        </div>
      </li>
    </Link>
  );
}
