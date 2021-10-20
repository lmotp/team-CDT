import React, { useRef, useState } from 'react';
import Modals from '../Modal/Modals';
import ModalContents from '../Modal/ModalContents';

function HashTagContents({ data, moreObserver, isLoading }) {
  const [modalOpen, setModalOpen] = useState(false);
  const observer = useRef(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="share-contents">
        <div className="hashTagContents" key={data.id_coffee_item} ref={moreObserver}>
          <img onClick={openModal} src={data.coffee_img} alt={data.coffee_name} />
          <h2 ref={observer}>{data.coffee_name}</h2>
          <Modals modalOpen={modalOpen} close={closeModal}>
            <ModalContents contents={data} closeModal={closeModal} />
          </Modals>
        </div>
        <div ref={moreObserver}>{isLoading ? 'Loading...' : ''}</div>
      </div>
    </>
  );
}

export default HashTagContents;
