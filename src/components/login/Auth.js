import axios from 'axios';
import React, { useState, useRef } from 'react';

import useInput from './../../hooks/useInput.js';
import useFocus from './../../hooks/useFocus.js';

import './../../styles/layouts/login/auth.css';

function Auth({ history }) {
  const authData = [];

  const [selectGenderValue, setSelectGenderValue] = useState('');
  const [selectMonthValue, setSelectMonthValue] = useState('');
  const [selectYearValue, setSelectYearValue] = useState('');

  const genderRef = useRef();
  const monthRef = useRef();

  const usernameFs = useFocus(false);
  const pwdFs = useFocus(false);
  const checkPwdFs = useFocus(false);
  const nameFs = useFocus(false);
  const genderFs = useFocus(false);
  const bYearFs = useFocus(false);
  const bMonthFs = useFocus(false);
  const bDayFs = useFocus(false);
  const pNFs = useFocus(false);

  const username = useInput('', usernameFs.setFocus);
  const pwd = useInput('', pwdFs.setFocus);
  const checkPwd = useInput('', checkPwdFs.setFocus);
  const name = useInput('', nameFs.setFocus);
  const birthdayDay = useInput('', bDayFs.setFocus);
  const phoneNumber = useInput('', pNFs.setFocus);

  const selectGenderChange = (e) => {
    setSelectGenderValue(e.target.value);
    if (e.target.value !== 'gender') {
      genderFs.setFocus(false);
    } else if (e.target.value === 'gender') {
      genderFs.setFocus(true);
    }
  };

  const blurGender = () => {
    if (genderRef.current.value === 'gender') {
      genderFs.setFocus(true);
    }
  };

  const selectYearChange = (e) => {
    setSelectYearValue(e.target.value);
    if (e.target.value.length !== 0) {
      bYearFs.setFocus(false);
    }
  };

  const blurYear = () => {
    if (selectYearValue.length === 0) {
      bYearFs.setFocus(true);
    }
    if (monthRef.current.value === 'month' && selectYearValue.length !== 0) {
      bMonthFs.setFocus(true);
    }
  };

  const selectMonthChange = (e) => {
    setSelectMonthValue(e.target.value);
    if (e.target.value !== 'month') {
      bMonthFs.setFocus(false);
    } else if (e.target.value === 'month') {
      bMonthFs.setFocus(true);
    }
    if (birthdayDay.inputValue.length === 0) {
      bDayFs.setFocus(true);
    }
  };

  const blurMonth = () => {
    if (selectYearValue.length !== 0 && monthRef.current.value === 'month') {
      bMonthFs.setFocus(true);
    }
    if (monthRef.current.value !== 'month' && birthdayDay.inputValue.length === 0) {
      bDayFs.setFocus(true);
    }
  };

  const submitJoin = async (e) => {
    e.preventDefault();
    await axios
      .post('/auth/join', {
        username: username.inputValue,
        pwd: pwd.inputValue,
        checkPwd: checkPwd.inputValue,
        name: name.inputValue,
        gender: selectGenderValue,
        birthdayYear: selectYearValue,
        birthdayMonth: selectMonthValue,
        birthdayDay: birthdayDay.inputValue,
        phoneNumber: phoneNumber.inputValue,
      })
      .then((res) => {
        authData.push(res.data[0]);
      });
    history.push('/user');
    window.scrollTo(0, 0);
  };

  return (
    <div className="auth">
      <div className="auth-content">
        <header className="auth-content-header">
          <h2>회원가입</h2>
        </header>
        <form className="auth-content-list" onSubmit={submitJoin}>
          <div className="auth-content-list-item">
            <label for="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username.inputValue}
              onChange={username.handleInputValue}
              maxLength="20"
              onBlur={usernameFs.handleFocus}
            ></input>
            {authData.length === 0 || authData[0].username !== username.inputValue ? null : (
              <span className="idError">이미 사용중이거나 탈퇴한 아이디입니다.</span>
            )}
            {usernameFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label for="pwd">비밀번호</label>
            <input
              type="text"
              id="pwd"
              name="pwd"
              value={pwd.inputValue}
              onChange={pwd.handleInputValue}
              maxLength="20"
              onBlur={pwdFs.handleFocus}
            ></input>
            {pwdFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label for="checkPwd">비밀번호 재확인</label>
            <input
              type="text"
              id="checkPwd"
              name="checkPwd"
              value={checkPwd.inputValue}
              onChange={checkPwd.handleInputValue}
              maxLength="20"
              onBlur={checkPwdFs.handleFocus}
            ></input>
            {checkPwdFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label for="name">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name.inputValue}
              onChange={name.handleInputValue}
              maxLength="20"
              onBlur={nameFs.handleFocus}
            ></input>
            {nameFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <p>성별</p>
            <select name="gender" ref={genderRef} onChange={selectGenderChange} onBlur={blurGender}>
              <option value="gender" selected>
                성별
              </option>
              <option value="men">남자</option>
              <option value="women">여자</option>
            </select>
            <i class="fas fa-angle-down gender-icon"></i>
            {genderFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          <div className="auth-content-list-item">
            <label for="yy" className="yy-header">
              생년월일
            </label>
            <div className="birthday">
              <input
                type="text"
                maxLength="4"
                id="yy"
                name="yy"
                placeholder="년(4자)"
                value={selectYearValue}
                onChange={selectYearChange}
                className="yy"
                aria-label="년(4자)"
                onBlur={blurYear}
              ></input>
              <select name="mm" ref={monthRef} onChange={selectMonthChange} onBlur={blurMonth}>
                <option value="month" selected>
                  월
                </option>
                <option value="jan">1</option>
                <option value="feb">2</option>
                <option value="mar">3</option>
                <option value="apr">4</option>
                <option value="may">5</option>
                <option value="jun">6</option>
                <option value="jul">7</option>
                <option value="aug">8</option>
                <option value="sep">9</option>
                <option value="oct">10</option>
                <option value="nov">11</option>
                <option value="dec">12</option>
              </select>
              <i class="fas fa-angle-down mm-icon"></i>
              <input
                type="text"
                maxLength="2"
                name="dd"
                placeholder="일"
                value={birthdayDay.inputValue}
                onChange={birthdayDay.handleInputValue}
                className="dd"
                aria-label="일"
                onBlur={bDayFs.handleFocus}
              ></input>
            </div>
            {bYearFs.focus ? <span className="idError">태어난 년도를 정확하게 입력해주세요.</span> : null}
            {bMonthFs.focus && !bYearFs.focus ? (
              <span className="idError">태어난 월을 정확하게 입력해주세요</span>
            ) : null}
            {bDayFs.focus && !bMonthFs.focus && !bYearFs.focus ? (
              <span className="idError">태어난 일을 정확하게 입력해주세요</span>
            ) : null}
          </div>
          <div className="auth-content-list-item">
            <label for="phoneNumber">휴대전화</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="전화번호 입력"
              value={phoneNumber.inputValue}
              onChange={phoneNumber.handleInputValue}
              maxLength="11"
              onBlur={pNFs.handleFocus}
            ></input>
            {pNFs.focus ? <span className="idError">필수정보입니다.</span> : null}
          </div>
          {/*
          <p className="auth-content-list-item">
            <input
              type="text"
              name="checkPhoneNumber"
              className="checkPhoneNumber"
              placeholder="인증번호를 입력하세요."
              value={checkPhoneNumber.inputValue}
              onChange={checkPhoneNumber.handleInputValue}
              maxLength="20"
            ></input>
            <button type="button" className="checkPhoneNumberButton">
              인증번호 받기
            </button>
          </p>
          */}
          <button type="submit" className="join-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
