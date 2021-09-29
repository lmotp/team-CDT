import React, { useState } from 'react';
import { useHashContents } from '../../Context';
import Modals from '../Modal/Modals';
import ModalContents from '../Modal/ModalContents';

function HashTagContents({ hashTag }) {
  const hashContents = useHashContents();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="share-contents">
      {hashContents
        .filter((contents) => contents.tag.includes(hashTag))
        .map((contents) => (
          <div className="hashTagContents" key={contents.id}>
            <h2>{contents.title}</h2>
            <img onClick={openModal} src={contents.image} alt={contents.tag} />
            <Modals modalOpen={modalOpen} close={closeModal}>
              <ModalContents contents={contents} closeModal={closeModal} />
            </Modals>
            <div>{contents.tag}</div>
          </div>
        ))}
    </div>
  );
}

export default HashTagContents;
