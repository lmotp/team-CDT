import React from 'react';

function ModalMyPage({ userProfileImg, setValue, value, chnageHandler, profileThumbnail, changeName }) {
  return (
    <div className="myPage-modal">
      <h2>SCDT</h2>
      <p>커뮤니티에서 사용하실 닉네임을 설정해주세요.</p>
      <div className="myPage-change">
        <div className="profile-box">
          <div>
            {userProfileImg && !profileThumbnail ? (
              <img src={userProfileImg} alt="프로필이미지" />
            ) : profileThumbnail ? (
              <img src={profileThumbnail} alt="프로필이미지"></img>
            ) : (
              <i className="far fa-user-circle user-icon"></i>
            )}
          </div>
          <input type="file" accept="image/*" id="imgInput" onChange={chnageHandler} />
          <label htmlFor="imgInput">이미지 업로드</label>
        </div>
        <div className="nick-input">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            maxLength="5"
            placeholder="닉네임을 입력해 주세요."
          />
          <button
            onClick={() => {
              setValue('');
            }}
          >
            x
          </button>
          {!changeName ? (
            <div className="myPageError">한글과 영문 대소문자를 사용하세요.(특수문자, 공백 불가)</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ModalMyPage;
