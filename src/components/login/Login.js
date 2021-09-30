import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';

import './../../styles/layouts/login/login.css';

function Login({ login, setLogin, history }) {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const pwdRef = useRef();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const hanldePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: '/user/login',
      data: { user_name: username, user_pwd: pwd },
    }).then((response) => {
      console.log(response.data);
      setLogin({ ...response.data });
    });
  };

  useEffect(() => {
    if (login.checkLogin === true) {
      history.push('/');
    } else if (login.reLogin === false) {
      alert('다시 로그인해주세요.');
      pwdRef.current.focus();
      setPwd('');
    }
  }, [login.checkLogin, login.reLogin]);

  return (
    <div className="login-content">
      <div className="login-form">
        <header>
          <h2>SCDT 로그인</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            <label for="username">
              <h3>아이디</h3>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="login-text"
              placeholder="id"
              onChange={handleUsername}
            ></input>
          </div>
          <div className="login-box">
            <label for="password">
              <h3>비밀번호</h3>
            </label>
            <input
              ref={pwdRef}
              type="password"
              id="password"
              name="password"
              className="login-text"
              placeholder="password"
              value={pwd}
              onChange={hanldePwd}
            ></input>
          </div>
          <button type="submit" className="login-submit">
            로그인
          </button>
          <div className="button-list">
            <button type="button" className="button">
              아이디 찾기
            </button>
            <button type="button" className="button">
              비밀번호 찾기
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Link to="/auth">회원가입</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
