import react, { useState } from 'react';
import GnbTitle from './GnbTitle.js';
import SearchInput from './SearchInput.js';
import WriteButton from './WriteButton.js';
import GnbMenu from './GnbMenu.js';

export default function HeaderGnb() {
  return (
    <>
      <header className="gnb">
        <GnbTitle></GnbTitle>
        <SearchInput></SearchInput>
        <WriteButton></WriteButton>
        <GnbMenu></GnbMenu>
      </header>
    </>
  );
}
