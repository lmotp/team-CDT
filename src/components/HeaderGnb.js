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

  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput value={inputValue} onChange={handleInputValue} onClick={handleSearchButton}></SearchInput>
        <WriteButton></WriteButton>
        <GnbMenu></GnbMenu>
      </header>
    </>
  );
}
