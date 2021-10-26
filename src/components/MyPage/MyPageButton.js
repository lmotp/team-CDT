import React from 'react';

function MyPageButton({ value, clickHandler, parentValue }) {
  return (
    <button
      onClick={() => clickHandler(value)}
      className={parentValue === value ? 'myPage-button on' : 'myPage-button'}
    >
      {value}
    </button>
  );
}

export default MyPageButton;
