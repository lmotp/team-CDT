import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/detail.css';

import moment from 'moment';
import 'moment/locale/ko';

const DetailList = ({ category }) => {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    axios.post('/notice/list', { board: category }).then((res) => setNoticeList(res.data));
  }, [category]);

  console.log(noticeList);

  return (
    <div className="DetailList-wrap">
      <h2>{category}</h2>
      {noticeList.map((list) => (
        <Link to={`/detailpage/${list.post_id}`}>
          <div className="DetailList-form">
            <div>
              <div className="DetailList-form-title">
                {list.bracket ? `[${list.bracket}]` : null} &nbsp;
                {list.title}
              </div>
              <div className="DetailList-form-info">
                {list.nickname} &nbsp;
                {moment(list.createdAt).format('YYYY년 MM월 DD일')}
                <i className="far fa-eye eye"></i>
                {list.views}
                <i className="far fa-heart heart"></i>
                {list.heart}
              </div>
            </div>
            <div className="DetailList-another-wrap">
              <img src={list.thumb} alt={list.title} />
              <div className="DetailList-comment-wrap">
                <i className="far fa-comment-dots comment-icon"></i>
                <div>{list.count}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <button>
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default DetailList;
