import React from 'react';

import cafeLatte from './../../images/카페라떼.png';
import grinLatte from './../../images/녹차라떼.png';
import caramelLatte from './../../images/카라멜마끼아또.png';

import './../../styles/layouts/video-contents.css';

import ArticleInfo from './ArticleInfo';

export default function VideoListItem(props) {
  console.log(props.data);
  const videoData = props.data;

  const videoList = videoData.map((videoItem, index) => {
    return (
      <>
        <li key={index} className="video-contents-list-item">
          <a href="/">
            <div class="video-thumb">
              <img src={videoItem.img} alt={videoItem.alt} />
              <i class="far fa-play-circle play-icon"></i>
            </div>
            <p>
              <span class="menu-color">[영상콘텐츠]</span>
              {videoItem.desc}
            </p>
            <div className="video-overay" aria-hidden></div>
          </a>
          <ArticleInfo eye={videoItem.eye} like={videoItem.like} date={videoItem.date} />
        </li>
      </>
    );
  });

  return <ul className="video-collection">{videoList}</ul>;
}
