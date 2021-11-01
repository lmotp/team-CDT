import React from 'react';

import './../../styles/layouts/video-contents.css';

import VideoListItem from './VideoListItem';

export default function VideoList({ boardList }) {
  return (
    <div className="video-contents-list">
      <ul className="video-collection">
        {boardList
          .filter((v, i) => i < 6)
          .map((v) => (
            <VideoListItem data={v}></VideoListItem>
          ))}
      </ul>
    </div>
  );
}
