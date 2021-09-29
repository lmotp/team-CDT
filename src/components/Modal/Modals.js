import React from 'react';
import '../../styles/modal.css';

const Modals = ({ modalOpen, close, children }) => {
  return (
    <div className={modalOpen ? 'openModal modal' : null}>
      {modalOpen ? (
        <section>
          <main>{children}</main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modals;
