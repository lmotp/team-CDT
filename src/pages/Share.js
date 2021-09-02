import React from 'react';
import HashTagButton from '../components/HashTagButton';
import { useHashTagState } from '../Context';

function Share() {
  const state = useHashTagState();
  console.log('어머 리렌더링이라니', state);
  return (
    <div>
      {state.map((hashTag) => (
        <HashTagButton key={hashTag.id} tagStatus={hashTag.status} hashTag={hashTag.tag} hashId={hashTag.id} />
      ))}
    </div>
  );
}

export default Share;
