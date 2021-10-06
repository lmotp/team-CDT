import React, { useEffect, useState } from 'react';

function DetailContent({ contents }) {
  const [hashTag, setHashTag] = useState([]);

  const textToCopy = window.location.href;

  useEffect(() => {
    if (contents) {
      const hashTagSplit = contents.hashTag.split(',');
      setHashTag(hashTagSplit);
    }
  }, [contents]);

  return (
    <section>
      <div className="content" dangerouslySetInnerHTML={{ __html: contents.content }}></div>
      <div className="hashTag-box">
        {hashTag.map((v, i) => (
          <span key={i}>#{v} </span>
        ))}
      </div>
      <div className="button-box">
        <button className="likes-button">100</button>
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
