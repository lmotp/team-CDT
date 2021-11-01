import React from 'react';

import MainNews from './MainNews';
import VideoContents from './VideoContents';

import './../../styles/layouts/contents.css';

export default function ContentsMain({ noticeList, boardList }) {
  return (
    <div className="section-bottom">
      <MainNews noticeList={noticeList}></MainNews>
      <VideoContents boardList={boardList}></VideoContents>
    </div>
  );
}
