import React, { useState } from 'react';
import GnbTitle from './GnbTitle.js';
import SearchInput from './SearchInput.js';
import WriteButton from './WriteButton.js';
import GnbMenu from './GnbMenu.js';
import TopAuth from './TopAuth.js';

import './../styles/base/reset.css';
import './../styles/base/visually-hidden.css';
import './../styles/layouts/gnb.css';
import './../styles/layouts/search-input.css';
import './../styles/layouts/write-button.css';
import './../styles/layouts/gnb-menu.css';
import './../styles/layouts/top-auth.css';
import { useHistory } from 'react-router-dom';
import { useOrderBox } from '../Context.js';

export default function HeaderGnb({ isLogin, setIsLogin, username, userProfileImg }) {
  const [inputValue, setInputValue] = useState('');
  const { setOrder, setLoading } = useOrderBox();
  const history = useHistory();

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchButton = () => {
    setInputValue('');
  };

  const handleWriteButton = () => {
    if (isLogin) {
      window.scrollTo(0, 0);
      history.push('/uploadform');
      return;
    } else {
      let yes_login = window.confirm('로그인이 필요합니다.');
      if (!isLogin && yes_login === true) {
        window.scrollTo(0, 0);
        history.push('/user');
      } else {
        return;
      }
    }
  };

  const gotoGameButton = () => {
    window.scrollTo(0, 0);
    history.push('/foodgame');
  };

  const scrollTop = () => {
    window.scrollTo(0, 0);
    setLoading(false);
    setOrder(0);
  };

  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput value={inputValue} onChange={handleInputValue} onClick={handleSearchButton}></SearchInput>
        <WriteButton onClick={handleWriteButton} write={'글쓰기'}></WriteButton>
        <WriteButton onClick={gotoGameButton} write={'오늘 뭐 먹지?'}></WriteButton>
        <GnbMenu scrollTop={scrollTop}></GnbMenu>
        <TopAuth
          username={username}
          userProfileImg={userProfileImg}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        ></TopAuth>
      </header>
    </>
  );
}
