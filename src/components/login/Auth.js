import axios from 'axios';
import React, { useState } from 'react';

import useInput from './../../hooks/useInput.js';

import './../../styles/layouts/login/auth.css';

export default function Auth() {
  const [authData, setAuthData] = useState([]);

  const username = useInput('');
  const pwd = useInput('');
  const checkPwd = useInput('');
  const name = useInput('');
  const gender = useInput('');
  const birthday = useInput('');
  const phoneNumber = useInput('');
  const checkPhoneNumber = useInput('');

  const submitJoin = async () => {
    await axios
      .post('/auth/join', {
        username: username.inputValue,
        pwd: pwd.inputValue,
        checkPwd: checkPwd.inputValue,
        name: name.inputValue,
        gender: gender.inputValue,
        birthday: birthday.inputValue,
        phoneNumber: phoneNumber.inputValue,
        checkPhoneNumber: checkPhoneNumber.inputValue,
      })
      .then((res) => {
        setAuthData(authData.concat(res.data));
      });
  };

  return (
    <div className="auth">
      <div className="auth-content">
        <header className="auth-content-header">
          <h2>회원가입</h2>
        </header>
        <form className="auth-content-list" onSubmit={submitJoin}>
          <p className="auth-content-list-item">
            <label for="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username.inputValue}
              onChange={username.handleInputValue}
            ></input>
            {authData.length === 0 || authData[0].username !== username.inputValue ? null : (
              <span className="idError">이미 사용중이거나 탈퇴한 아이디입니다.</span>
            )}
          </p>
          <p className="auth-content-list-item">
            <label for="pwd">비밀번호</label>
            <input type="text" id="pwd" name="pwd" value={pwd.inputValue} onChange={pwd.handleInputValue}></input>
          </p>
          <p className="auth-content-list-item">
            <label for="checkPwd">비밀번호 재확인</label>
            <input
              type="text"
              id="checkPwd"
              name="checkPwd"
              value={checkPwd.inputValue}
              onChange={checkPwd.handleInputValue}
            ></input>
          </p>
          <p className="auth-content-list-item">
            <label for="name">이름</label>
            <input type="text" id="name" name="name" value={name.inputValue} onChange={name.handleInputValue}></input>
          </p>
          <p className="auth-content-list-item">
            <label for="gender">성별</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={gender.inputValue}
              onChange={gender.handleInputValue}
            ></input>
          </p>
          <p className="auth-content-list-item">
            <label for="birthday">생년월일</label>
            <input
              type="text"
              id="birthday"
              name="birthday"
              value={birthday.inputValue}
              onChange={birthday.handleInputValue}
            ></input>
          </p>
          <p className="auth-content-list-item">
            <label for="phoneNumber">휴대전화</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="전화번호 입력"
              value={phoneNumber.inputValue}
              onChange={phoneNumber.handleInputValue}
            ></input>
          </p>
          <p className="auth-content-list-item">
            <input
              type="text"
              name="checkPhoneNumber"
              className="checkPhoneNumber"
              placeholder="인증번호를 입력하세요."
              value={checkPhoneNumber.inputValue}
              onChange={checkPhoneNumber.handleInputValue}
            ></input>
            <button type="button" className="checkPhoneNumberButton">
              인증번호 받기
            </button>
          </p>
          <button type="submit" className="join-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
