import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ModalMyPage from '../components/Modal/ModalMyPage';
import Modals from '../components/Modal/Modals';
import MyPageCoffee from '../components/MyPage/MyPageCoffee';
import MyPageContents from '../components/MyPage/MyPageContents';
import MyPageTapBox from '../components/MyPage/MyPageTapBox';
import '../styles/mypage.css';

function MyPage({ user, isLogin, userProfileImg, usernames, setUsername, setUserProfileImg }) {
  const { username, bYear, bMonth, bDay, gender, id } = user;
  const [parentValue, setParentValue] = useState('작성글');
  const [contents, setContents] = useState([]);
  const [contentCount, setConentCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [coffeeHeartCount, setCoffeeHeartCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState(usernames);
  const [fileName, setFileName] = useState('');
  const [profileThumbnail, setProfileThumbnail] = useState('');
  const [status, setStatus] = useState(true);
  const on = true;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProfileThumbnail('');
  };

  const changeModal = () => {
    const formData = new FormData();
    formData.append('image', fileName);
    formData.append('name', value);
    formData.append('id', id);

    axios.put(`/mypage/profile`, formData).then(() => {
      setProfileThumbnail('');
      setFileName('');
      setModalOpen(false);
      setStatus(false);
    });
  };

  const chnageProfileImg = (e) => {
    let theFile = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setProfileThumbnail(e.target.result);
      setFileName(theFile);
    };

    reader.readAsDataURL(theFile);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('/loginCheck').then(({ data }) => {
      console.log(data);
      setUsername(data.username);
      setUserProfileImg(data.userProfileImg);
      setStatus(true);
    });
  }, [userProfileImg, username, setUsername, setUserProfileImg, status]);

  useEffect(() => {
    axios.get(`/mypage/${id}/content`).then(({ data }) => setConentCount(data.length));
    axios.get(`/mypage/${id}/comment`).then(({ data }) => setCommentCount(data.length));
    axios.get(`/mypage/${id}/heart`).then(({ data }) => setHeartCount(data.length));
    axios.get(`/mypage/${id}/coffeeheart`).then(({ data }) => setCoffeeHeartCount(data.length));
  }, [id]);

  useEffect(() => {
    axios.get(`/mypage/list/${id}/${parentValue}`).then(({ data }) => setContents(data));
  }, [id, parentValue]);

  return (
    <section className="myPage-wrap">
      <div className="myPage-header">
        {userProfileImg ? (
          <img src={userProfileImg} alt="프로필이미지" />
        ) : (
          <i className="far fa-user-circle user-icon"></i>
        )}
        <div className="myPage-profile">
          <h2>
            {usernames}
            <button onClick={openModal} className="changeHandler">
              수정
            </button>
          </h2>
          <Modals modalOpen={modalOpen} close={closeModal} on={on} change={changeModal}>
            <ModalMyPage
              userProfileImg={userProfileImg}
              setValue={setValue}
              value={value}
              chnageHandler={chnageProfileImg}
              profileThumbnail={profileThumbnail}
            />
          </Modals>
          <div className="myPage-profile-info">
            <span className="username">{username}</span>
            <span>{bYear}.</span>
            <span className="month">{bMonth}.</span>
            <span className="day">{bDay > 10 ? bDay : `0${bDay}`}</span>
            <span className="gender">{gender}</span>
          </div>
          <div className="count-box">
            <i class="far fa-comment-dots comment-icon">
              &nbsp;{contentCount > 10 ? contentCount : `0${contentCount}`}
            </i>
            <i class="far fa-comments">&nbsp;{commentCount > 10 ? commentCount : `0${commentCount}`}</i>
            <i class="far fa-heart heart">&nbsp;{heartCount > 10 ? heartCount : `0${heartCount}`}</i>
            <i class="far fa-kiss-wink-heart">
              &nbsp;{coffeeHeartCount > 10 ? coffeeHeartCount : `0${coffeeHeartCount}`}
            </i>
          </div>
        </div>
      </div>
      <MyPageTapBox parentValue={parentValue} setParentValue={setParentValue} />
      <div className="myPage-wrap-box">
        {parentValue !== '좋아요 한 커피메뉴' ? (
          <div>
            {contents.map((content, index) => {
              return <MyPageContents contents={content} index={index} usernames={usernames} />;
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
