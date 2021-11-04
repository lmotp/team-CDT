import React, { useEffect, useState, memo } from 'react';
import Modals from '../Modal/Modals';
import ModalContents from '../Modal/ModalContents';
import axios from 'axios';
import { useHistory } from 'react-router';

function HashTagContents({ data, userId, on, category }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!userId) {
      setHeartState(false);
      return;
    }
    if (on.includes(data.id_coffee_item) && userId) {
      setHeartState(true);
    } else {
      setHeartState(false);
    }
  }, [on, data.id_coffee_item, userId]);

  const heartStateHandler = () => {
    if (!userId) {
      const confirm = window.confirm('로그인 하시겠습니까?');
      if (confirm) {
        return history.push({ pathname: '/user', state: { heartChange: true, category } });
      } else {
        return;
      }
    }
    setHeartState(!heartState);
    axios.post('/share/list/heart', { userId, coffeeId: data.id_coffee_item }).then((res) => console.log(res));
  };

  return (
    <>
      <div className="coffeeItem-contents">
        <div className="hashTagContents" key={data.id_coffee_item}>
          <img className="infoImg" onClick={openModal} src={data.coffee_img} alt={data.coffee_name} />
          <h2 className="infoName">{data.coffee_name}</h2>
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
