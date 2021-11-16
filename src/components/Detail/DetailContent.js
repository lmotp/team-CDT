import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import dompurify from 'dompurify';

function DetailContent({ contents, postId, userId, heartCount, setHeartCount, isLogin }) {
  const [hashTag, setHashTag] = useState([]);
  const [heart, setHeart] = useState(false);
  const [heartInfo, setHeartInfo] = useState([]);
  const history = useHistory();
  const textToCopy = window.location.href;

  useEffect(() => {
    if (contents) {
      const hashTagSplit = contents.hashTag.split(',');
      setHashTag(hashTagSplit);
    }
  }, [contents]);

  useEffect(() => {
    axios.post('/detailpage/heart', { postId }).then(({ data }) => setHeartCount(data.count));
    axios.post('/detailpage/hearted', { postId, auth: userId }).then(({ data }) => {
      if (data.result) {
        setHeart(true);
        setHeartInfo(data.info[0].heart_id);
      } else {
        setHeart(false);
      }
    });
  }, [postId, userId, setHeartCount]);

  const heartHandler = () => {
    if (!isLogin) {
      const confirm = window.confirm('로그인 하시겠습니까??');
      if (confirm) {
        history.push({ pathname: '/user', state: { change: true, postId } });
        return;
      } else {
        return;
      }
    } else {
      if (heart) {
        axios.post('/detailpage/heart/remove', { postId, auth: userId, heartId: heartInfo }).then(({ data }) => {
          setHeart(data);
          setHeartCount(heartCount - 1);
        });
        axios.post('/detailpage/heart/removeCount', { postId }).then((res) => console.log(res));
      } else {
        axios.post('/detailpage/heart/add', { postId, auth: userId }).then(({ data }) => {
          setHeart(data);
          setHeartCount(heartCount + 1);
        });
        axios.post('/detailpage/heart/addCount', { postId }).then((res) => console.log(res));
      }
    }
  };

  return (
    <section>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: dompurify.sanitize(contents.content, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
          }),
        }}
      ></div>
      <div className="hashTag-box">
        {hashTag.map((v, i) => (
          <span key={i}>#{v} </span>
        ))}
      </div>
      <div className="button-box">
        <button className={heart ? 'likes-button on' : 'likes-button'} onClick={heartHandler}>
          {heartCount}
        </button>
        <button
          className="url-button"
          onClick={() => {
            navigator.clipboard.writeText(textToCopy);
            window.alert('주소가 복사되었습니다.');
          }}
        >
          URL복사
        </button>
      </div>
    </section>
  );
}

export default DetailContent;
