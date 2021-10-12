import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/ko';

function DetailListBoard({ list, i }) {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    const imgSrcMatch = list.content.match(/image[^]+[\\"]/gm);
    if (list.content.includes('img')) {
      const imgSrcJoin = imgSrcMatch.join();
      const imgSrcSplit = imgSrcJoin.split('" ');
      setImgUrl(imgSrcSplit[0]);
    }
  }, [list.content]);

  console.log(imgUrl);

  return (
    <Link to={`/detailpage/${list.post_id}`} key={i}>
      <div className="DetailList-form">
        <div>
          <div className="DetailList-form-title">
            <span style={{ color: 'burlywood' }}>[{list.category}]</span>&nbsp;
            {list.bracket ? `[${list.bracket}]` : null} &nbsp;
            {list.title}
          </div>
          <div className="DetailList-form-info">
            {list.nickname} &nbsp;
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
