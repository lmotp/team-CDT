import React, { useState } from 'react';

const noticeBoard = [
  { id: 1, category: '주요소식' },
  { id: 2, category: '비디오' },
  { id: 3, category: '추천게시판' },
  { id: 4, category: '자유게시판' },
];

const bracketsBox = [
  { id: 1, bracket: '공지사항' },
  { id: 2, bracket: '진행 중 이벤트' },
];

const UploadFormCategory = () => {
  const [category, setCategory] = useState('게시판을 선택해 주세요.');
  const [brackets, setBrackets] = useState('말머리를 선택');
  const [disabled, setDisabled] = useState(true);
  const [mainCategoryStatus, setMainCategoryStatus] = useState(false);
  const [mainBracketsStatus, setMainBracketsStatus] = useState(false);

  // 카테고리 바꾸기 로직
  const changeCategory = () => {
    setMainCategoryStatus(!mainCategoryStatus);
  };

  const categoryValueChange = (e) => {
    const changeCategory = e.target.innerText;
    console.log();

    if (changeCategory === '주요소식') {
      setDisabled(false);
    } else {
      setBrackets('말머리를 선택');
      setMainBracketsStatus(false);
      setDisabled(true);
    }

    setCategory(changeCategory);
    setMainCategoryStatus(!mainCategoryStatus);
  };

  // 말머리 바꾸기 로직
  const changeBrackets = () => {
    setMainBracketsStatus(!mainBracketsStatus);
  };

  const bracketsValueChange = (e) => {
    const changeBrackets = e.target.innerText;

    setBrackets(changeBrackets);
    setMainBracketsStatus(!mainBracketsStatus);
  };

  return (
    <div className="form-category-wrap">
      <div className="select-box">
        <button onClick={changeCategory} className={mainCategoryStatus ? 'main-category on' : 'main-category off'}>
          {category}
        </button>
        {mainCategoryStatus && (
          <ul className="categories-box">
            {noticeBoard.map((v) => (
              <li key={v.id}>
                <button className={v.category === category ? 'select' : null} onClick={categoryValueChange}>
                  {v.category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="brackets-box">
        <button
          disabled={disabled}
          onClick={changeBrackets}
          className={mainBracketsStatus ? 'main-brackets on' : 'main-brackets off'}
        >
          {brackets}
        </button>
        {mainBracketsStatus && (
          <ul className="brackets-button-box">
            {bracketsBox.map((v) => (
              <li key={v.id}>
                <button className={v.bracket === brackets ? 'select' : null} onClick={bracketsValueChange}>
                  {v.bracket}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UploadFormCategory;
