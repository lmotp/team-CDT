import React from 'react';
import MyPageTapBox from '../components/MyPage/MyPageTapBox';
import '../styles/mypage.css';

function MyPage({ user, isLogin }) {
  console.log(user);
  const { profileImg, name, username, bYear, bMonth, bDay, gender } = user;

  return (
    <section className="myPage-wrap">
      <div className="myPage-header">
        <img src={profileImg} alt="프로필이미지" />
        <div className="myPage-profile">
          <h2>{name}</h2>
          <div className="myPage-profile-info">
            <span className="username">{username}</span>
            <span>{bYear}.</span>
            <span className="month">{bMonth}.</span>
            <span className="day">{bDay > 10 ? bDay : `0${bDay}`}</span>
            <span className="gender">{gender}</span>
          </div>
          <div className="count-box">
            <i class="far fa-heart heart"> 50</i>
            <i class="far fa-comment-dots comment-icon"> 50</i>
            <i class="far fa-comments"> 50</i>
          </div>
        </div>
      </div>
      <MyPageTapBox />
    </section>
  );
}

export default MyPage;
