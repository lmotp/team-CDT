import React, { useRef, useState } from 'react';

import BoardTopItem from './BoardTopItem';

import './../../../styles/layouts/notice-board/board-top.css';

export default function BoardTop({ noticeList }) {
  const [order, setOrder] = useState(0);

  const boardTopCollectionRef = useRef();
  const boardTopOrderRef = useRef();
  const boardTopLeftController = useRef();
  const boardTopRightController = useRef();

  const spliceNoticeList = [...noticeList].splice(order, 2);

  const handleRightController = (e) => {
    if (boardTopOrderRef.current.textContent === '1 / 4') {
      setOrder(2);
      boardTopOrderRef.current.textContent = '2 / 4';
      boardTopLeftController.current.style.color = '#333';
    } else if (boardTopOrderRef.current.textContent === '2 / 4') {
      setOrder(4);
      boardTopOrderRef.current.textContent = '3 / 4';
    } else if (boardTopOrderRef.current.textContent === '3 / 4') {
      setOrder(6);
      boardTopOrderRef.current.textContent = '4 / 4';
      e.target.style.color = '#ccc';
    }
  };

  const handleLeftController = (e) => {
    if (boardTopOrderRef.current.textContent === '4 / 4') {
      setOrder(4);
      boardTopOrderRef.current.textContent = '3 / 4';
      boardTopRightController.current.style.color = '#333';
    } else if (boardTopOrderRef.current.textContent === '3 / 4') {
      setOrder(2);
      boardTopOrderRef.current.textContent = '2 / 4';
    } else if (boardTopOrderRef.current.textContent === '2 / 4') {
      setOrder(0);
      boardTopOrderRef.current.textContent = '1 / 4';
      e.target.style.color = '#ccc';
    }
  };

  return (
    <div className="board-top">
      <div className="board-top-collection">
        <ul ref={boardTopCollectionRef} className="board-top-list">
          {spliceNoticeList.map((boardTopItem) => {
            return (
              <BoardTopItem
                category={boardTopItem.category}
                bracket={boardTopItem.bracket}
                title={boardTopItem.title}
                thumb={boardTopItem.thumb}
                date={boardTopItem.createdAt}
                eye={boardTopItem.views}
                heart={boardTopItem.heart}
                count={boardTopItem.count}
                postId={boardTopItem.post_id}
                name={boardTopItem.name}
                content={boardTopItem.content}
              />
            );
          })}
        </ul>
      </div>
      <div className="board-top-controller">
        <p ref={boardTopOrderRef} className="board-top-order">
          1 / 4
        </p>
        <i
          ref={boardTopLeftController}
          onClick={handleLeftController}
          className="far fa-caret-square-left board-arrow-left"
        ></i>
        <i
          ref={boardTopRightController}
          onClick={handleRightController}
          className="far fa-caret-square-right board-arrow-right"
        ></i>
      </div>
    </div>
  );
}
