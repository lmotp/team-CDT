import React from 'react';

function ModalContents({ closeModal, contents }) {
  return (
    <div>
      <img onClick={closeModal} src={contents.image} alt={contents.tag} />
      <h2>{contents.title}</h2>
      <p>
        들어 긴지라 가장 바로 얼음에 그림자는 능히 얼마나 있으랴? 미묘한 우는 가슴에 착목한는 그들의 소금이라 뜨고,
        이것이다.
      </p>
    </div>
  );
}

export default ModalContents;
