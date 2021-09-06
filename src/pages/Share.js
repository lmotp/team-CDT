import React from 'react';
import HashTagButton from '../components/HasTag/HashTagButton';
import HashTagContents from '../components/HasTag/HashTagContents';
import { useHashContents, useHashTagState } from '../Context';
import '../styles/style.css';

function Share() {
  const state = useHashTagState();
  const contetns = useHashContents();

  const wow = state.filter((contents) => contents.status).map((contetns) => contetns.tag);
  const wow2 = contetns.filter((contetns, id) => contetns.tag.includes(wow));
  console.log(wow, wow2);

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
