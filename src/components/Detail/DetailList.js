import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/detail.css';
import eventThumb from './../../images/event.png';
import updateThumb from './../../images/update.png';

const boardList = [
  {
    id: 1,
    title: '[공지사항]',
    desc: '9.8(수) 카페 업데이트 점검 안내 (08:00 ~ 09:00)',
    nickName: 'SCDT',
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
    nickName: 'SCDT',
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
    nickName: 'SCDT',
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
    nickName: 'SCDT',
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
    nickName: 'SCDT',
    date: '2021.08.20',
    eye: '7782',
    like: '816',
    cm: '87',
    thumb: eventThumb,
  },
];

const DetailList = ({ category }) => {
  return (
    <div className="DetailList-wrap">
      <h2>{category}</h2>
      {boardList.map((list) => (
        <div className="DetailList-form">
          <div>
            <div className="DetailList-form-title">
              {list.title} &nbsp;
              {list.desc}
            </div>
            <div className="DetailList-form-info">
              <i className="fas fa-volume-up speaker"></i>
              {list.nickName} &nbsp;
              {list.date}
              <i className="far fa-eye eye"></i>
              {list.eye}
              <i className="far fa-heart heart"></i>
              {list.like}
            </div>
          </div>
          <div className="DetailList-another-wrap">
            <img src={list.thumb} alt={list.title} />
            <div className="DetailList-comment-wrap">
              <i className="far fa-comment-dots comment-icon"></i>
              <div>{list.cm}</div>
            </div>
          </div>
        </div>
      ))}
      <button>
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default DetailList;
