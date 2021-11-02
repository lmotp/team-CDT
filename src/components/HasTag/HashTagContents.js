import React, { useEffect, useState, memo } from 'react';
import Modals from '../Modal/Modals';
import ModalContents from '../Modal/ModalContents';
import axios from 'axios';

function HashTagContents({ data, userId, on }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [heartState, setHeartState] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!userId) {
      setHeartState(false);
    }
    if (on.includes(data.id_coffee_item) && userId) {
      setHeartState(true);
    }
  }, [on, data.id_coffee_item, userId]);

  const heartStateHandler = () => {
    setHeartState(!heartState);
    axios.post('/share/list/heart', { userId, coffeeId: data.id_coffee_item }).then((res) => console.log(res));
  };

  return (
    <>
      <div className="share-contents">
        <div className="hashTagContents" key={data.id_coffee_item}>
          <img onClick={openModal} src={data.coffee_img} alt={data.coffee_name} />
          <h2>{data.coffee_name}</h2>
          <i onClick={heartStateHandler} class={!heartState ? 'far fa-heart heart' : 'fas fa-heart heart'}></i>
          <Modals modalOpen={modalOpen} close={closeModal}>
            <ModalContents contents={data} closeModal={closeModal} />
          </Modals>
        </div>
      </div>
    </>
  );
}

export default memo(HashTagContents);
