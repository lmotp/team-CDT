import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';

function DetailListBoard({ list, i, setCurrentPage }) {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (list.content.includes('img')) {
      const imgSrcMatch = list.content.match(/src[^]+[\\"]/gm);
      if (imgSrcMatch !== null) {
        const imgSrcJoin = imgSrcMatch.join();
        const imgSrcSplit = imgSrcJoin.split('"');
        setImgUrl(imgSrcSplit[1]);
      }
    }
  }, [list.content]);

  return (
    <Link
      to={`/detailpage/${list.post_id}`}
      key={i}
      onClick={() => {
        setCurrentPage(1);
        axios.post('/detailpage/views', { postId: list.post_id });
      }}
    >
      <div className="DetailList-form">
        <div>
          <div className="DetailList-form-title">
            <span style={{ color: 'burlywood' }}>[{list.category}]</span>&nbsp;
            {list.bracket ? ` [${list.bracket}] ` : null}
            {list.title}
          </div>
          <div className="DetailList-form-info">
            {list.name} &nbsp;
            {moment(list.createdAt).format('YYYY년 MM월 DD일')}
            <i className="far fa-eye eye"></i>
            {list.views}
            <i className="far fa-heart heart"></i>
            {list.heart}
          </div>
        </div>
        <div className="DetailList-another-wrap">
          {list.content.includes('img') ? <img src={imgUrl} alt={list.title} /> : null}
          <div className="DetailList-comment-wrap">
            <i className="far fa-comment-dots comment-icon"></i>
            <div>{list.count}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DetailListBoard;
