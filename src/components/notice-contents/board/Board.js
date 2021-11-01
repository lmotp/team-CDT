import React, { useEffect, useRef, useState } from 'react';

import BoardSearch from './../search/BoardSearch.js';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardTop from './../board-top/BoardTop';
import Footer from './../Footer';

import './../../../styles/layouts/notice-board/board.css';

import axios from 'axios';
import { useParams } from 'react-router';
import Loading from '../../../pages/Loading.js';
import { useOrderBox } from '../../../Context.js';

export default function Board() {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [noticeList, setNoticeList] = useState([]);
  const boardCollectionRef = useRef();
  const { order, setOrder, loading, setLoading } = useOrderBox();
  const { board } = useParams();

  useEffect(() => {
    axios.post('/notice/list', { board }).then((res) => {
      setNoticeList(res.data);
      setLoading(true);
    });
  }, [board, setLoading]);

  const spliceBoardList = [...noticeList].splice(order, 10);
  const spliceSearchBoardList = [...newData].splice(order, 10);

  const boards = spliceBoardList.reverse().map((boardItem) => {
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

  const newBoard = spliceSearchBoardList.reverse().map((boardItem) => {
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
    <>
      {loading ? (
        <>
          <BoardTop />
          <BoardSearch
            data={noticeList}
            setInitialBoard={setInitialBoard}
            setNewData={setNewData}
            newData={newData}
            setOrder={setOrder}
          ></BoardSearch>
          <div className="board">
            <div ref={boardCollectionRef} className="board-collection">
              <ul className="board-list">
                {initialBoard ? (
                  boards
                ) : newData.length === 0 ? (
                  <div className="not-search">검색 결과 - 0</div>
                ) : (
                  newBoard
                )}
              </ul>
            </div>
            <BoardControll order={order} setOrder={setOrder}></BoardControll>
            <Footer></Footer>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
