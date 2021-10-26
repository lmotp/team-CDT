import React from 'react';

function ModalMyPage({ profileImg, setValue, value, chnageHandler, profileThumbnail }) {
  return (
    <div className="myPage-modal">
      <h2>SCDT</h2>
      <p>커뮤니티에서 사용하실 닉네임을 설정해주세요.</p>
      <div className="myPage-change">
        <div className="profile-box">
          <div>
            {profileImg && !profileThumbnail ? (
              <img src={profileImg} alt="프로필이미지" />
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
            placeholder="닉네임을 입력해 주세요."
          />
          <button
            onClick={() => {
              setValue('');
            }}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMyPage;
