import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/detail.css';

import DetailListBoard from './DetailListBoard';

const DetailList = ({ category, noticeList, setCurrentPage }) => {
  const [urlCategory, setUrlCategory] = useState('');

  useEffect(() => {
    if (category === '주요소식') {
      setUrlCategory('board');
    } else {
      setUrlCategory('free');
    }
  }, [category]);

  return (
    <div className="DetailList-wrap">
      <h2>{category}</h2>
      {noticeList
        .filter((v, i) => 10 > i)
        .map((list, i) => (
          <DetailListBoard list={list} i={i} setCurrentPage={setCurrentPage} />
        ))}

      <div className="DetailList-button-box">
        <button>
          <Link to={category === '영상콘텐츠' ? `/video_list` : `/notice/${urlCategory}`}>목록으로</Link>
        </button>
      </div>
    </div>
  );
};

export default DetailList;
