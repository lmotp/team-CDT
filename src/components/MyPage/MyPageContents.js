import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';

function MyPageContents({ contents, index, name, parentValue }) {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (contents.content && contents?.content.includes('img')) {
      const imgSrcMatch = contents?.content.match(/src[^]+[\\"]/gm);
      if (imgSrcMatch !== null) {
        const imgSrcJoin = imgSrcMatch.join();
        const imgSrcSplit = imgSrcJoin.split('"');
        setImgUrl(imgSrcSplit[1]);
      }
    } else if (contents.content && contents?.content.includes('youtube')) {
      const srcMatch = contents?.content.match(/www.youtube.com\/embed\/([a-zA-Z0-9-_]+)?/gm);
      if (srcMatch !== null) {
        const srcJoin = srcMatch.join();
        const srcSplit = srcJoin.split('/');
        setImgUrl(srcSplit[2]);
      }
    }
  }, [contents.content]);

  return (
    <Link to={`/detailpage/${contents.post_id}`} key={index}>
      <div className="myPage-form">
        <div>
          <div className="myPage-form-title">
            <span style={{ color: 'burlywood' }}>[{contents.category}]</span>&nbsp;
            {contents.bracket ? ` [${contents.bracket}] ` : null}
            {contents.title}
          </div>
          <div className="myPage-form-info">
            {name} &nbsp;
            {moment(contents.createdAt).format('YYYY년 MM월 DD일')}
            <i className="far fa-eye eye"></i>
            {contents.views}
            <i className="far fa-heart heart"></i>
            {contents.heart}
          </div>
        </div>
        <div className="myPage-another-wrap">
          {contents.content && contents.content.includes('img') ? <img src={imgUrl} alt={contents.title} /> : null}
          {contents.content && contents.content.includes('youtube') ? (
            <img src={`https://img.youtube.com/vi/${imgUrl}/mqdefault.jpg`} alt={contents.alt} />
          ) : null}
          <div className="myPage-comment-wrap">
            <i className="far fa-comment-dots comment-icon"></i>
            <div>{contents.count}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MyPageContents;
