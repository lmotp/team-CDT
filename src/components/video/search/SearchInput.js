import React, { useState } from 'react';

import './../../../styles/layouts/video-board/board-search-input.css';

export default function SearchInput({ data, setOrder, setNewData, categoryTag, categoryData, setInitialBoard }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchButton = () => {
    setOrder(0);
    if (categoryTag.current.textContent === categoryData[0]) {
      // 제목 + 내용일 때
      const newD = data.filter((item) => {
        return item.title.indexOf(inputValue) !== -1 || item.content.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    } else if (categoryTag.current.textContent === categoryData[1]) {
      // 제목일 때
      const newD = data.filter((item) => {
        return item.title.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    } else if (categoryTag.current.textContent === categoryData[2]) {
      // 내용일 때
      const newD = data.filter((item) => {
        return item.content.indexOf(inputValue) !== -1;
      });
      setNewData(newD);
      setInitialBoard(false);
    }
  };

  return (
    <div className="video-board-search-input">
      <input type="text" className="video-board-allSearch" value={inputValue} onChange={handleInputValue} />
      <button type="button" className="video-board-search-button" aria-label="검색" onClick={handleSearchButton}>
        <i className="fas fa-search video-board-search-icon"></i>
      </button>
    </div>
  );
}
