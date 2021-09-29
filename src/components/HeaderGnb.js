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
import { Link, useHistory } from 'react-router-dom';

export default function HeaderGnb({ login, setLogin }) {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearchButton = () => {
    setInputValue('');
  };
  const handleWriteButton = () => {
    let yes_login = window.confirm('로그인이 필요합니다.');
    if (!login.checkLogin && yes_login === true) {
      history.push('/user');
    } else {
      history.push('/uploadform');
    }
  };

  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput value={inputValue} onChange={handleInputValue} onClick={handleSearchButton}></SearchInput>
        <WriteButton onClick={handleWriteButton} write={'글쓰기'}></WriteButton>
        <Link to="foodgame">
          <WriteButton write={'오늘 뭐 먹지?'}></WriteButton>
        </Link>
        <GnbMenu></GnbMenu>
        <TopAuth login={login} setLogin={setLogin}></TopAuth>
      </header>
    </>
  );
}
