import React from 'react';
import MyPageButton from './MyPageButton';

const buttonValues = ['작성글', '댓글 단 글', '좋아요 한 글', '좋아요 한 커피메뉴'];

function MyPageTapBox({ parentValue, setParentValue }) {
  const clickHandler = (value) => {
    setParentValue(value);
  };

  return (
    <div className="tag-box">
      {buttonValues.map((value, index) => (
        <MyPageButton value={value} parentValue={parentValue} clickHandler={clickHandler} key={index} />
      ))}
    </div>
  );
}

export default MyPageTapBox;
