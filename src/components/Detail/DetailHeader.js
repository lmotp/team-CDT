import React from 'react';

function DetailHeader({ eyeCount, contents }) {
  console.log(contents);
  const { bracket, title, category, createdAt, img, nickname } = contents;

  console.log(bracket);

  return (
    <header>
      <h2>{category}</h2>
      <h3>
        {bracket ? `[${bracket}]` : bracket}&nbsp;
        {title}
      </h3>
      <div className="profile-wrap">
        <img src={img} alt={nickname} />
        <div className="date">
          <div>{nickname}</div>
          <span>{createdAt}</span>
          <i className="far fa-eye eye"></i>
          <span>{eyeCount}</span>
        </div>
      </div>
    </header>
  );
}

export default DetailHeader;
