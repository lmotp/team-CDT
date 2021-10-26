import React from 'react';
import '../../styles/modal.css';

const Modals = ({ modalOpen, close, change, children, on }) => {
  return (
    <div className={modalOpen ? 'openModal modal' : null}>
      {modalOpen ? (
        <section>
          <main>{children}</main>
          <footer>
            <button className={on ? 'modal-close on' : 'modal-close'} onClick={close}>
              취소
            </button>
            {on && (
              <button className={on ? 'modal-close on' : 'modal-close'} onClick={change}>
                확인
              </button>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modals;
