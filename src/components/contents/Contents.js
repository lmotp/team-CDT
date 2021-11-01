import React, { useEffect, useState } from 'react';

import ContentsHeader from './ContentsHeader';
import ContentsMain from './ContentsMain';
import ContentsFooter from './ContentsFooter';
import Footer from './Footer';
import axios from 'axios';
import Loading from '../../pages/Loading';
import './../../styles/layouts/contents.css';

export default function Contents() {
  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.post('/notice/list', { board: '영상콘텐츠' }).then((res) => setBoardList(res.data));
    axios.post('/notice/list', { board: '주요소식' }).then((res) => {
      setNoticeList(res.data);
      setLoading(true);
    });
  }, []);

  return (
    <div className="contents">
      {loading ? (
        <>
          <ContentsHeader></ContentsHeader>
          <ContentsMain noticeList={noticeList} boardList={boardList}></ContentsMain>
          <ContentsFooter></ContentsFooter>
          <Footer></Footer>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
