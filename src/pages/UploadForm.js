import React, { useState } from 'react';
import { useHistory } from 'react-router';
import UploadFormButtonBox from '../components/UploadForm/UploadFormButtonBox';
import UploadFormCategory from '../components/UploadForm/UploadFormCategory';
import UploadFormCotent from '../components/UploadForm/UploadFormCotent';
import UploadFormHashTag from '../components/UploadForm/UploadFormHashTag';
import UploadFormTitle from '../components/UploadForm/UploadFormTitle';
import { useTestDispatch, useUploadState } from '../Context';
import '../styles/uploadForm.css';

const UploadForm = () => {
  const history = useHistory();
  const testDispatch = useTestDispatch();
  const hashTagState = useUploadState();
  const [titleValue, setTitleValue] = useState('');
  const [category, setCategory] = useState('게시판을 선택해 주세요.');
  const [brackets, setBrackets] = useState('말머리를 선택');
  const [disabled, setDisabled] = useState(true);
  const [mainCategoryStatus, setMainCategoryStatus] = useState(false);
  const [mainBracketsStatus, setMainBracketsStatus] = useState(false);

  const submitContent = {
    hashTag: hashTagState,
    title: titleValue,
    category,
    brackets,
  };

  // 말머리,게시판 선택 이벤트 !!!!
  // 카테고리 바꾸기 로직
  const changeCategory = () => {
    setMainCategoryStatus(!mainCategoryStatus);
  };

  const categoryValueChange = (e) => {
    const changeCategory = e.target.innerText;

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

  // 타이틀 이벤트 !!
  const changeTitleValue = (e) => {
    const { value } = e.target;
    setTitleValue(value);
  };

  // 버튼 이벤트 !!!
  const cancelClick = () => {
    const status = window.confirm('정말로 취소하시겠습니까?');
    if (status) {
      history.push('/');
    }
  };

  const uploadClick = () => {
    testDispatch({ type: 'SUBMIT', content: submitContent });
    history.push('/notice');
  };

  return (
    <div className="uploadForm-wrap">
      <UploadFormCategory
        category={category}
        brackets={brackets}
        disabled={disabled}
        changeCategory={changeCategory}
        categoryValueChange={categoryValueChange}
        changeBrackets={changeBrackets}
        bracketsValueChange={bracketsValueChange}
        mainCategoryStatus={mainCategoryStatus}
        mainBracketsStatus={mainBracketsStatus}
      />
      <UploadFormTitle titleValue={titleValue} changeTitleValue={changeTitleValue} />
      <UploadFormCotent />
      <UploadFormHashTag />
      <UploadFormButtonBox uploadClick={uploadClick} cancelClick={cancelClick} />
    </div>
  );
};

export default UploadForm;
