import React from 'react';

import VideoList from './VideoList';

import './../../styles/layouts/video-contents.css';

export default function VideoContents({ boardList }) {
  return (
    <div className="video-contents">
      <h2>영상콘텐츠</h2>
      <VideoList boardList={boardList}></VideoList>
    </div>
  );
}
