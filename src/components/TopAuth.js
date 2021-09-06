import React from 'react';

export default function TopAuth() {
  return (
    <>
      <div className="top-auth">
        <div className="inner">
          <button type="text" aria-label="유저 로그인 버튼">
            <i class="far fa-user user-icon"></i>
          </button>
          <button type="text" className="login">
            로그인
          </button>
        </div>
      </div>

      {/* 로그인 후
      <div className="top-auth">
        <div className="inner">
          <a href="/" className="profile" aria-label="유저 프로필">
            <i class="far fa-user-circle user-icon"></i>
            <span className="nickname">닉네임</span>
          </a>
          <button type="button" className="logout">
            로그아웃
          </button>
        </div>
      </div>*/}
    </>
  );
}
