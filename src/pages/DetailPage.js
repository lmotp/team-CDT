import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/Detail/DetailHeader';
import '../styles/detail.css';
import slide5 from '../images/bback.jpg';
import DetailContent from '../components/Detail/DetailContent';
import DetailComment from '../components/Detail/DetailComment';
import DetailCommentSection from '../components/Detail/DetailCommentSection';
import DetailList from '../components/Detail/DetailList';
import axios from 'axios';

function DetailPage() {
  const [contents, setContents] = useState('');
  const today = new Date();
  const time = today.getHours();
  const minutes = today.getMinutes();
  const dateString = today.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const value = [
    {
      category: '주요소식',
      title: '[공지사항]9.8(수) 카페 업데이트 점검 안내 (08:00 ~ 09:00)',
      profileImg: slide5,
      profileNickName: '나는차가좋아',
      date: dateString,
      eyeCount: 20,
    },
  ];

  useEffect(() => {
    axios.post('/detail', { id: 8 }).then((res) => setContents(res.data[0]));
  }, []);

  return (
    <div className="detail-wrap">
      <DetailHeader
        category={value[0].category}
        title={value[0].title}
        profileImg={value[0].profileImg}
        profileNickName={value[0].profileNickName}
        date={value[0].date}
        eyeCount={value[0].eyeCount}
        time={time}
        minutes={minutes}
      />
      <DetailContent contents={contents} />
      <DetailComment />
      <DetailCommentSection date={value[0].date} time={time} minutes={minutes} />
      <DetailList category={value[0].category} />
    </div>
  );
}

export default DetailPage;
