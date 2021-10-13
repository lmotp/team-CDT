import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/detail.css';

import DetailListBoard from './DetailListBoard';

const DetailList = ({ category, noticeList }) => {
  return (
    <div className="DetailList-wrap">
      <h2>{category}</h2>
      {noticeList.map((list, i) => (
        <DetailListBoard list={list} i={i} />
      ))}

      <button>
        <Link to="/">홈으로</Link>
      </button>
    </div>
  );
};

export default DetailList;
