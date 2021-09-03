import React from 'react';
import HashTagButton from '../components/HasTag/HashTagButton';
import HashTagContents from '../components/HasTag/HashTagContents';
import { useHashTagState, useHashContents } from '../Context';
import '../styles/style.css';

function Share() {
  const state = useHashTagState();
  const contents = useHashContents();
  console.log(state, contents);

  return (
    <div>
      {state.map((hashTag) => (
        <HashTagButton key={hashTag.id} tagStatus={hashTag.status} hashTag={hashTag.tag} hashId={hashTag.id} />
      ))}
      {state
        .filter((contents) => contents.status)
        .map((contents) => (
          <HashTagContents key={contents.id} hashTag={contents.tag} />
        ))}
    </div>
  );
}

export default Share;
