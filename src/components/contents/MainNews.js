import React, { useState } from 'react';

import BoardItem from './BoardItem';

import './../../styles/layouts/main-news.css';

import eventThumb from './../../images/event.png';
import updateThumb from './../../images/update.png';

export default function MainNews() {
  const [counterEye, setCounterEye] = useState(0);
  const [counterLike, setCounterLike] = useState(0);
  const [counterCm, setCounterCm] = useState(0);

  const boardList = [
    {
      id: 1,
      title: '[공지사항]',
      desc: '9.8(수) 카페 업데이트 점검 안내 (08:00 ~ 09:00)',
      date: '2021.09.08',
      eye: '3560',
      like: '25',
      cm: '15',
      thumb: updateThumb,
    },
    {
      id: 2,
      title: '[진행 중 이벤트]',
      desc: '스타벅스에서 쿠폰쏜다! (08.30 ~ 9.30)',
      date: '2021.08.30',
      eye: '15600',
      like: '356',
      cm: '32',
      thumb: eventThumb,
    },
    {
      id: 3,
      title: '[진행 중 이벤트]',
      desc: '카페지기의 라이브 방송 사전 안내 및 쿠폰 이벤트 (09.07)',
      date: '2021.08.28',
      eye: '1900',
      like: '56',
      cm: '72',
      thumb: eventThumb,
    },
    {
      id: 4,
      title: '[공지사항]',
      desc: '08.15(화) 메가커피 쿠폰 이벤트 당첨자 안내',
      date: '2021.08.25',
      eye: '782',
      like: '16',
      cm: '22',
      thumb: updateThumb,
    },
    {
      id: 5,
      title: '[진행 중 이벤트]',
      desc: '롤챔스 승자예측 쿠폰 이벤트 "DK vs T1"',
      date: '2021.08.20',
      eye: '7782',
      like: '816',
      cm: '87',
      thumb: eventThumb,
    },
  ];

  const board = boardList.map((boardItem) => {
    return (
      <BoardItem
        title={boardItem.title}
        desc={boardItem.desc}
        thumb={boardItem.thumb}
        date={boardItem.date}
        eye={boardItem.eye}
        like={boardItem.like}
        cm={boardItem.cm}
      />
    );
  });

  return (
    <div className="main-news">
      <h2>주요소식</h2>
      <ul className="main-news-list">{board}</ul>
      <div className="controller">
        <p className="main-news-order">1 / 4</p>
        <i class="far fa-caret-square-left square-arrow-left"></i>
        <i class="far fa-caret-square-right square-arrow-right"></i>
      </div>
    </div>
  );
}
