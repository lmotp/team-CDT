import React from 'react';
import UploadFormButtonBox from '../components/UploadForm/UploadFormButtonBox';
import UploadFormCategory from '../components/UploadForm/UploadFormCategory';
import UploadFormCotent from '../components/UploadForm/UploadFormCotent';
import UploadFormTitle from '../components/UploadForm/UploadFormTitle';
import '../styles/uploadForm.css';

const UploadForm = () => {
  return (
    <div className="uploadForm-wrap">
      <UploadFormCategory />
      <UploadFormTitle />
      <UploadFormButtonBox />
      <UploadFormCotent />
    </div>
  );
};

export default UploadForm;
