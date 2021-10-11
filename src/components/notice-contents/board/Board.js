import React, { useEffect, useRef, useState } from 'react';

import BoardSearch from './../search/BoardSearch.js';
import BoardItem from './BoardItem';
import BoardControll from './BoardControll';
import BoardTop from './../board-top/BoardTop';
import Footer from './../Footer';

import './../../../styles/layouts/notice-board/board.css';

import eventThumb from './../../../images/event.png';
import updateThumb from './../../../images/update.png';
import axios from 'axios';
import { useParams } from 'react-router';

export default function Board() {
  const [newData, setNewData] = useState([]);
  const [initialBoard, setInitialBoard] = useState(true);
  const [order, setOrder] = useState(0);
  const [noticeList, setNoticeList] = useState([]);
  const boardCollectionRef = useRef();
  const { board } = useParams();

  useEffect(() => {
    axios.post('/notice/list', { board }).then((res) => setNoticeList(res.data));
  }, [board]);

  const boardList = [
    {
      id: 1,
      menu: '[공지사항]',
      title: '9.8(수) 카페 업데이트 점검 안내 (08:00 ~ 09:00)',
      date: '2021.09.08',
      eye: '3560',
      like: '25',
      cm: '15',
      thumb: updateThumb,
      desc: 'a',
    },
    {
      id: 2,
      menu: '[공지사항]',
      title: '스타벅스에서 쿠폰쏜다! (08.30 ~ 9.30)',
      date: '2021.08.30',
      eye: '15600',
      like: '356',
      cm: '32',
      thumb: eventThumb,
      desc: 'b',
    },
    {
      id: 3,
      menu: '[공지사항]',
      title: '카페지기의 라이브 방송 사전 안내 및 쿠폰 이벤트 (09.07)',
      date: '2021.08.28',
      eye: '1900',
      like: '56',
      cm: '72',
      thumb: eventThumb,
      desc: 'c',
    },
    {
      id: 4,
      menu: '[공지사항]',
      title: '08.15(화) 메가커피 쿠폰 이벤트 당첨자 안내',
      date: '2021.08.25',
      eye: '782',
      like: '16',
      cm: '22',
      thumb: updateThumb,
      desc: 'd',
    },
    {
      id: 5,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 6,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 7,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 8,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 9,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 10,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 11,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
    {
      id: 12,
      menu: '[공지사항]',
      title: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
      desc: '카페',
    },
  ];

  const spliceBoardList = [...noticeList].splice(order, 10);
  const spliceSearchBoardList = [...newData].splice(order, 10);

  console.log(noticeList);

  const boards = spliceBoardList.map((boardItem) => {
    return (
      <BoardItem
        bracket={boardItem.bracket}
        title={boardItem.title}
        thumb={boardItem.thumb}
        date={boardItem.createdAt}
        eye={boardItem.views}
        heart={boardItem.heart}
        count={boardItem.count}
        postId={boardItem.post_id}
        nickName={boardItem.nickname}
      />
    );
  });

  const newBoard = spliceSearchBoardList.map((boardItem) => {
    return (
      <BoardItem
        bracket={boardItem.bracket}
        title={boardItem.title}
        thumb={boardItem.thumb}
        date={boardItem.createdAt}
        eye={boardItem.views}
        heart={boardItem.heart}
        count={boardItem.count}
        postId={boardItem.post_id}
        nickName={boardItem.nickname}
      />
    );
  });

  return (
    <>
      <BoardTop />
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
