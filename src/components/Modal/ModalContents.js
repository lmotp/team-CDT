import React from 'react';

function ModalContents({ closeModal, contents }) {
  return (
    <div>
      <img onClick={closeModal} src={contents.coffee_img} alt={contents.coffee_name} />
      <h2>{contents.coffee_name}</h2>
      <p>{contents.coffee_value}</p>
    </div>
  );
}

export default ModalContents;
