import React, { useEffect, useState } from 'react';

import './../../styles/layouts/video-contents.css';

import VideoListItem from './VideoListItem';

import axios from 'axios';

export default function VideoList() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios.post('/notice/list', { board: '영상콘텐츠' }).then((res) => setBoardList(res.data));
  }, []);

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
