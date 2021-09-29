import React from 'react';

function DetailHeader({ category, title, profileImg, profileNickName, date, eyeCount, time, minutes }) {
  return (
    <header>
      <h2>{category}</h2>
      <h3>{title}</h3>
      <div className="profile-wrap">
        <img src={profileImg} alt={profileNickName} />
        <div className="date">
          <div>{profileNickName}</div>
          <span>
            {date} &nbsp;{time} : {minutes}
          </span>
          <i className="far fa-eye eye"></i>
          <span>{eyeCount}</span>
        </div>
      </div>
    </header>
  );
}

export default DetailHeader;
