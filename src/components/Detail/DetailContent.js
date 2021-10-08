import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DetailContent({ contents, postId }) {
  const [hashTag, setHashTag] = useState([]);
  const [heart, setHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [heartInfo, setHeartInfo] = useState([]);
  const textToCopy = window.location.href;

  useEffect(() => {
    if (contents) {
      const hashTagSplit = contents.hashTag.split(',');
      setHashTag(hashTagSplit);
    }
  }, [contents]);

  useEffect(() => {
    axios.post('/detailpage/heart', { postId }).then(({ data }) => setHeartCount(data.count));
    axios.post('/detailpage/hearted', { postId, auth: 2 }).then(({ data }) => {
      if (data.result) {
        setHeart(true);
        setHeartInfo(data.info[0].heart_id);
      } else {
        setHeart(false);
      }
    });
  }, [postId]);

  const heartHandler = () => {
    if (heart) {
      axios.post('/detailpage/heart/remove', { postId, auth: 2, heartId: heartInfo }).then(({ data }) => {
        setHeart(data);
        setHeartCount(heartCount - 1);
      });
    } else {
      axios.post('/detailpage/heart/add', { postId, auth: 2 }).then(({ data }) => {
        setHeart(data);
        setHeartCount(heartCount + 1);
      });
    }
  };

  return (
    <section>
      <div className="content" dangerouslySetInnerHTML={{ __html: contents.content }}></div>
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
          }}
        >
          URL복사
        </button>
      </div>
    </section>
  );
}

export default DetailContent;
