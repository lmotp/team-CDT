import React, { useState } from 'react';
import ModalContents from '../Modal/ModalContents';
import Modals from '../Modal/Modals';

function MyPageCoffee({ content }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="myPage-coffee" key={content.id_coffee_item}>
      <img className="coffee-img" onClick={openModal} src={content.coffee_img} alt={content.coffee_name} />
      <h2 className="coffee-name">{content.coffee_name}</h2>
      <Modals modalOpen={modalOpen} close={closeModal}>
        <ModalContents contents={content} closeModal={closeModal} />
      </Modals>
    </div>
  );
}

export default MyPageCoffee;
