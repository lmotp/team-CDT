import React from 'react';
import { useHashContents } from '../../Context';

function HashTagContents({ hashTag }) {
  const hashContents = useHashContents();
  return (
    <div>
      {hashContents
        .filter((contents) => contents.tag.includes(hashTag))
        .map((contents) => (
          <div className="hashTagContents" key={contents.id}>
            <h2>{contents.title}</h2>
            <img src={contents.image} alt={contents.tag} />
            <div>{contents.tag}</div>
          </div>
        ))}
    </div>
  );
}

export default HashTagContents;
