import React, { useEffect, useState } from 'react';
import DetailHeader from '../components/Detail/DetailHeader';
import '../styles/detail.css';
import DetailContent from '../components/Detail/DetailContent';
import DetailComment from '../components/Detail/DetailComment';
import DetailCommentSection from '../components/Detail/DetailCommentSection';
import DetailList from '../components/Detail/DetailList';
import axios from 'axios';
import { useParams } from 'react-router';
import NotFound from './NotFound';

function DetailPage() {
  const [contents, setContents] = useState('');
  const { post_id } = useParams();

  useEffect(() => {
    axios.post('/detail', { id: post_id }).then((res) => setContents(res.data[0]));
  }, [post_id]);

  console.log(contents);

  return (
    <>
      {contents ? (
        <div className="detail-wrap">
          <DetailHeader eyeCount="20" contents={contents} />
          <DetailContent contents={contents} />
          <DetailComment />
          <DetailCommentSection date={contents.createdAt} />
          <DetailList category={contents.category} />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default DetailPage;
