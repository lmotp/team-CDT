import React from 'react';

const noticeBoard = [
  { id: 1, category: '주요소식' },
  { id: 2, category: '비디오' },
  { id: 3, category: '자유게시판' },
];

const bracketsBox = [
  { id: 1, bracket: '공지사항' },
  { id: 2, bracket: '진행 중 이벤트' },
];

const UploadFormCategory = ({
  category,
  brackets,
  disabled,
  changeCategory,
  categoryValueChange,
  changeBrackets,
  bracketsValueChange,
  mainCategoryStatus,
  mainBracketsStatus,
}) => {
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
