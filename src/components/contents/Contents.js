import React from 'react';

import ContentsHeader from './ContentsHeader';

import './../../styles/layouts/contents.css';
import { Link } from 'react-router-dom';

export default function Contents() {
  return (
    <div className="contents">
      <ContentsHeader></ContentsHeader>
      <button>
        <Link to="/foodgame">게임가기버튼일세</Link>
      </button>
    </div>
  );
}
