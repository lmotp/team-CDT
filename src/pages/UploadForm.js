import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UploadFormButtonBox from '../components/UploadForm/UploadFormButtonBox';
import UploadFormCategory from '../components/UploadForm/UploadFormCategory';
import UploadFormCotent from '../components/UploadForm/UploadFormCotent';
import UploadFormHashTag from '../components/UploadForm/UploadFormHashTag';
import UploadFormTitle from '../components/UploadForm/UploadFormTitle';
import { useTestDispatch, useTestState, useUploadDispatch, useUploadState } from '../Context';
import '../styles/uploadForm.css';

const UploadForm = () => {
  const history = useHistory();
  const testDispatch = useTestDispatch();
  const hashTagState = useUploadState();
  const uploadDispatch = useUploadDispatch();
  const testState = useTestState();
  const [titleValue, setTitleValue] = useState('');
  const [category, setCategory] = useState('게시판을 선택해 주세요.');
  const [brackets, setBrackets] = useState('말머리를 선택');
  const [disabled, setDisabled] = useState(true);
  const [mainCategoryStatus, setMainCategoryStatus] = useState(false);
  const [value, setValue] = useState('');
  const [mainBracketsStatus, setMainBracketsStatus] = useState(false);

  const submitContent = {
    id: testState.length === 0 ? 1 : testState.length + 1,
    hashTag: hashTagState,
    title: titleValue,
    category,
    brackets,
    value,
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
    axios.post('/uploadform', submitContent).then((res) => console.log('나는 무슨데이터?', res.data));
    uploadDispatch({ type: 'ALL_DELTE' });
    history.push('/notice');
  };

  // 썸머노트 컨텐츠 이벤트 !!
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onload = () => {
        console.log(reader.result);
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  };

  const onChange = (content) => {
    setValue(content);
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
      <UploadFormCotent onImageUpload={onImageUpload} onChange={onChange} />
      <UploadFormHashTag />
      <UploadFormButtonBox uploadClick={uploadClick} cancelClick={cancelClick} />
    </div>
  );
};

export default UploadForm;
