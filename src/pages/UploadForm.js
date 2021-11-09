import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import UploadFormButtonBox from '../components/UploadForm/UploadFormButtonBox';
import UploadFormCategory from '../components/UploadForm/UploadFormCategory';
import UploadFormCotent from '../components/UploadForm/UploadFormCotent';
import UploadFormHashTag from '../components/UploadForm/UploadFormHashTag';
import UploadFormTitle from '../components/UploadForm/UploadFormTitle';
import { useUploadDispatch, useUploadState } from '../Context';
import '../styles/uploadForm.css';

const UploadForm = ({ userId }) => {
  const location = useLocation();
  const changeStateLocation = location.state?.change;
  const contentsLocation = location.state?.contents;
  const history = useHistory();
  const hashTagState = useUploadState();
  const uploadDispatch = useUploadDispatch();
  const [titleValue, setTitleValue] = useState(!changeStateLocation ? '' : contentsLocation.title);
  const [category, setCategory] = useState(
    !changeStateLocation ? '게시판을 선택해 주세요.' : contentsLocation.category,
  );
  const [brackets, setBrackets] = useState(!contentsLocation?.bracket ? '말머리를 선택' : contentsLocation.bracket);
  const [disabled, setDisabled] = useState(!contentsLocation?.bracket ? true : false);
  const [mainCategoryStatus, setMainCategoryStatus] = useState(false);
  const [value, setValue] = useState('');
  const [mainBracketsStatus, setMainBracketsStatus] = useState(false);

  const submitContent = {
    id: userId,
    title: titleValue,
    category,
    brackets: brackets === '말머리를 선택' ? null : brackets,
    value: value ? value : contentsLocation?.content,
    hashTag: hashTagState?.map((v) => v.value).join(),
    postId: contentsLocation?.post_id,
    changeStateLocation,
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
    uploadDispatch({ type: 'ALL_DELTE' });
    if (status) {
      history.push('/');
    }
  };

  const uploadClick = () => {
    axios.post('/api/uploadform', submitContent).then((res) => res.data);

    uploadDispatch({ type: 'ALL_DELTE' });
    let board;
    if (category === '주요소식') {
      board = 'board';
    } else if (category === '자유게시판') {
      board = 'free';
    } else if (category === '영상콘텐츠') {
      board = 'video';
    }

    history.push(board === 'video' ? `/video_list` : `/notice/${board}`);
  };

  // 썸머노트 컨텐츠 이벤트 !!
  const onImageUpload = (images, insertImage) => {
    const formdata = new FormData();

    for (let i = 0; i < images.length; i++) {
      formdata.append('image', images[i]);
      axios
        .post('/api/thumbnail', formdata)
        .then((res) => insertImage(res.data))
        .catch((err) => console.log(err));
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
      <UploadFormCotent onImageUpload={onImageUpload} onChange={onChange} contents={contentsLocation?.content} />
      <UploadFormHashTag hashTag={contentsLocation?.hashTag} />
      <UploadFormButtonBox uploadClick={uploadClick} cancelClick={cancelClick} />
    </div>
  );
};

export default UploadForm;
