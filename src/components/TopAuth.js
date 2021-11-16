import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopAuth({ isLogin, setIsLogin, username, userProfileImg }) {
  /*const handleLogout = () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');
    setLogin({ ...login, checkLogin: !yesLogout });
  };
*/

  const handleLogout = async () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');
    if (yesLogout === true) {
      await axios.get('/api/logout');
      window.sessionStorage.removeItem('login');
      setIsLogin(false);
    }
  };

  console.log(isLogin);
  return (
    <>
      {isLogin ? (
        <div className="top-auth">
          <div className="inner">
            <Link to={`/mypage/${username}`} className="profile" aria-label="유저 프로필">
              {userProfileImg ? (
                <img src={userProfileImg} alt="프로필이미지" />
              ) : (
                <i class="far fa-user-circle user-icon"></i>
              )}
              <span className="nickname">{username}</span>
            </Link>
            <button type="button" className="logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        <div className="top-auth">
          <div className="inner">
            <button type="text" aria-label="유저 로그인 버튼">
              <i class="far fa-user user-icon"></i>
            </button>
            <button type="text" className="login">
              <Link to="/user">로그인</Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopAuth;
