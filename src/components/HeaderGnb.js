import React, { useState } from 'react';
import GnbTitle from './GnbTitle.js';
import SearchInput from './SearchInput.js';
import WriteButton from './WriteButton.js';
import GnbMenu from './GnbMenu.js';

export default function HeaderGnb() {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearchButton = () => {
    setInputValue('');
  };
  const handleWriteButton = () => {
    let yes_login = window.confirm('로그인이 필요합니다.');
    if (yes_login === true) {
      console.log('login');
    } else if (yes_login === false) {
      console.log('notLogin');
    }
  };

  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput value={inputValue} onChange={handleInputValue} onClick={handleSearchButton}></SearchInput>
        <WriteButton onClick={handleWriteButton}></WriteButton>
        <GnbMenu></GnbMenu>
      </header>
    </>
  );
}
