import React, { useEffect } from 'react';

import Board from './board/Board';

import './../../styles/layouts/contents.css';

export default function Video() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contents">
      <Board />
    </div>
  );
}
