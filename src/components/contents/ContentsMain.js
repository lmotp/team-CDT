import React from 'react';

import MainNews from './MainNews';
import VideoContents from './VideoContents';

import './../../styles/layouts/contents.css';

export default function ContentsMain() {
  return (
    <div className="section-bottom">
      <MainNews></MainNews>
      <VideoContents></VideoContents>
    </div>
  );
}
