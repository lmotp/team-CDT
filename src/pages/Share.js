import React from 'react';
import HashTagButton from '../components/HasTag/HashTagButton';
import HashTagContents from '../components/HasTag/HashTagContents';
import Modal from '../components/Modal/Modal';
import { useHashTagState } from '../Context';
import '../styles/share.css';

function Share() {
  const state = useHashTagState();

  const allStatus = state.filter((contents) => contents.status);

  return (
    <div className="share-wrap">
      {state.map((hashTag) => (
        <HashTagButton key={hashTag.id} tagStatus={hashTag.status} hashTag={hashTag.tag} hashId={hashTag.id} />
      ))}
      <div className="share-contents-wrap">
        {allStatus.length > 0
          ? state
              .filter((contents) => contents.status)
              .map((contents) => <HashTagContents key={contents.id} hashTag={contents.tag} />)
          : state
              .filter((contents) => [])
              .map((contents) => <HashTagContents key={contents.id} hashTag={contents.tag} />)}
      </div>
      <Modal />
    </div>
  );
}

export default Share;
