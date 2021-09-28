import React from 'react';
import { Link } from 'react-router-dom';

function TopAuth({ login, setLogin }) {
  const handleLogout = () => {
    const yesLogout = window.confirm('정말 로그아웃 하시겠습니까?');
    setLogin({ checkLogin: !yesLogout });
  };
  return (
    <>
      {login.checkLogin ? (
        <div className="top-auth">
          <div className="inner">
            <a href="/" className="profile" aria-label="유저 프로필">
              <i class="far fa-user-circle user-icon"></i>
              <span className="nickname">{login.nickname}</span>
            </a>
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
