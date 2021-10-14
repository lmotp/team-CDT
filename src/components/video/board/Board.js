import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import BoardSearch from './../search/BoardSearch';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import Footer from './../Footer';

import './../../../styles/layouts/video-board/board.css';

export default function Board() {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const boardCollectionRef = useRef();

  useEffect(() => {
    axios.post('/notice/list', { board: '비디오' }).then((res) => setBoardList(res.data));
  }, []);

  const spliceBoardList = [...boardList].splice(order, 12);
  const spliceSearchBoardList = [...newData].splice(order, 12);

  const boards = spliceBoardList.map((boardItem, index) => {
    return (
      <BoardItem
        date={boardItem.date}
        views={boardItem.views}
        heart={boardItem.heart}
        img={boardItem.img}
        alt={boardItem.alt}
        title={boardItem.title}
        postId={boardItem.post_id}
        name={boardItem.name}
        content={boardItem.content}
        index={index}
      />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem, index) => {
    return (
      <BoardItem
        date={boardItem.date}
        views={boardItem.views}
        heart={boardItem.heart}
        img={boardItem.img}
        alt={boardItem.alt}
        title={boardItem.title}
        name={boardItem.name}
        postId={boardItem.post_id}
        content={boardItem.content}
        index={index}
      />
    );
  });

  return (
    <>
      <BoardSearch
        data={boardList}
        setInitialBoard={setInitialBoard}
        setNewData={setNewData}
        newData={newData}
        setOrder={setOrder}
      ></BoardSearch>
      <div className="board">
        <div ref={boardCollectionRef} className="board-collection">
          <ul className="board-list">
            {initialBoard ? boards : newData.length === 0 ? <div className="not-search">검색 결과 - 0</div> : newBoard}
          </ul>
        </div>
      </div>
      <BoardControll order={order} setOrder={setOrder}></BoardControll>
      <Footer></Footer>
    </>
  );
}
