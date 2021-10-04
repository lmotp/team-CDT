import React, { useEffect, useState } from 'react';

function DetailContent({ contents }) {
  const [hashTag, setHashTag] = useState([]);

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
    </section>
  );
}

export default DetailContent;
