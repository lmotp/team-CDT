import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/detail.css';

import DetailListBoard from './DetailListBoard';

const DetailList = ({ category, noticeList, setCurrentPage }) => {
  return (
    <div className="DetailList-wrap">
      <h2>{category}</h2>
      {noticeList
        .filter((v, i) => 10 > i)
        .map((list, i) => (
          <DetailListBoard list={list} i={i} setCurrentPage={setCurrentPage} />
        ))}

      <button>
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default DetailList;
