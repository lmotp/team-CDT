import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyPageCoffee from '../components/MyPage/MyPageCoffee';
import MyPageContents from '../components/MyPage/MyPageContents';
import MyPageTapBox from '../components/MyPage/MyPageTapBox';
import '../styles/mypage.css';

function MyPage({ user, isLogin }) {
  const { profileImg, name, username, bYear, bMonth, bDay, gender, id } = user;
  const [parentValue, setParentValue] = useState('작성글');
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios.get(`/mypage/list/${id}/${parentValue}`).then(({ data }) => setContents(data));
  }, [id, parentValue]);

  console.log(contents);

  return (
    <section className="myPage-wrap">
      <div className="myPage-header">
        {profileImg ? <img src={profileImg} alt="프로필이미지" /> : <i className="far fa-user-circle user-icon"></i>}
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
      <MyPageTapBox parentValue={parentValue} setParentValue={setParentValue} />
      <div className="myPage-wrap-box">
        {parentValue !== '좋아요 한 커피메뉴' ? (
          <div>
            {contents.map((content, index) => {
              return <MyPageContents contents={content} index={index} name={name} parentValue={parentValue} />;
            })}
          </div>
        ) : (
          <div className="myPage-coffee-wrap">
            {contents.map((content, index) => {
              return <MyPageCoffee content={content} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyPage;
