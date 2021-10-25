import React, { useEffect, useState } from 'react';
import moment from 'moment';

import './../../styles/layouts/video-contents.css';

import ArticleInfo from './ArticleInfo';
import { Link } from 'react-router-dom';

export default function VideoListItem({ data }) {
  const [imgUrl, setImgUrl] = useState([]);
  const date = moment(data.date).format('YYYY.MM.DD');

  useEffect(() => {
    if (data?.content.includes('youtube')) {
      const srcMatch = data.content.match(/www.youtube.com\/embed\/([a-zA-Z0-9-_]+)?/gm);
      if (srcMatch !== null) {
        const srcJoin = srcMatch.join();
        const srcSplit = srcJoin.split('/');
        setImgUrl(srcSplit[2]);
      }
    }
  }, [data.content]);

  return (
    <>
      <li key={data.post_id} className="video-contents-list-item">
        <Link to={`/detailpage/${data.post_id}`}>
          <div class="video-thumb">
            <img src={`https://img.youtube.com/vi/${imgUrl}/mqdefault.jpg`} alt={data.alt} />
            <i class="far fa-play-circle play-icon"></i>
          </div>
          <p>
            <span class="menu-color">[영상콘텐츠]</span>
            {data.title}
          </p>
          <div className="video-overay" aria-hidden></div>
        </Link>
        <ArticleInfo views={data.views} heart={data.heart} date={date} name={data.name} count={data.count} />
      </li>
    </>
  );
}
