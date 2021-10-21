import React from 'react';
import { Link } from 'react-router-dom';

function HashTagButton({ category, categoryHandler, parentCategory }) {
  return (
    <span>
      <Link to={`/notice/recommend/${category}`}>
        <button onClick={() => categoryHandler(category)} className={category === parentCategory ? 'on' : null}>
          {category}
        </button>
      </Link>
    </span>
  );
}

export default HashTagButton;
