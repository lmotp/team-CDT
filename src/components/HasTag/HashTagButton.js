import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function HashTagButton({ childCategory, category, pagesHandler }) {
  return (
    <span>
      <Link to={`/notice/recommend/${childCategory}`}>
        <button onClick={pagesHandler} className={childCategory === category ? 'on' : null}>
          {childCategory}
        </button>
      </Link>
    </span>
  );
}

export default memo(HashTagButton);
