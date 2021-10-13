import React, { useState, useRef, useEffect } from 'react';

import BoardItem from './BoardItem';

import './../../styles/layouts/main-news.css';

import axios from 'axios';

export default function MainNews() {
  const [noticeList, setNoticeList] = useState([]);

  const newsCollectionRef = useRef();
  const newsOrderRef = useRef();
  const leftController = useRef();
  const rightController = useRef();

  useEffect(() => {
    axios.post('/notice/list', { board: '주요소식' }).then((res) => setNoticeList(res.data));
  }, []);

  const handleRightController = (e) => {
    if (newsOrderRef.current.textContent === '1 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(-900px)';
      newsOrderRef.current.textContent = '2 / 4';
      leftController.current.style.color = '#333';
    } else if (newsOrderRef.current.textContent === '2 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(-1800px)';
      newsOrderRef.current.textContent = '3 / 4';
    } else if (newsOrderRef.current.textContent === '3 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(-2700px)';
      newsOrderRef.current.textContent = '4 / 4';
      e.target.style.color = '#ccc';
    }
  };

  const handleLeftController = (e) => {
    if (newsOrderRef.current.textContent === '4 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(-1800px)';
      newsOrderRef.current.textContent = '3 / 4';
      rightController.current.style.color = '#333';
    } else if (newsOrderRef.current.textContent === '3 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(-900px)';
      newsOrderRef.current.textContent = '2 / 4';
    } else if (newsOrderRef.current.textContent === '2 / 4') {
      newsCollectionRef.current.style.transform = 'translateX(0px)';
      newsOrderRef.current.textContent = '1 / 4';
      e.target.style.color = '#ccc';
    }
  };

  const board = noticeList.map((boardItem) => {
    return (
      <BoardItem
        category={boardItem.category}
        bracket={boardItem.bracket}
        title={boardItem.title}
        thumb={boardItem.thumb}
        date={boardItem.createdAt}
        eye={boardItem.views}
        heart={boardItem.heart}
        count={boardItem.count}
        postId={boardItem.post_id}
        name={boardItem.name}
        content={boardItem.content}
      />
    );
  });

  return (
    <div className="main-news">
      <h2>주요소식</h2>
      <div ref={newsCollectionRef} className="news-collection">
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
        <ul className="main-news-list">{board}</ul>
      </div>
      <div className="main-news-controller">
        <p ref={newsOrderRef} className="main-news-order">
          1 / 4
        </p>
        <i
          ref={leftController}
          onClick={handleLeftController}
          className="far fa-caret-square-left square-arrow-left"
        ></i>
        <i
          ref={rightController}
          onClick={handleRightController}
          className="far fa-caret-square-right square-arrow-right"
        ></i>
      </div>
    </div>
  );
}
