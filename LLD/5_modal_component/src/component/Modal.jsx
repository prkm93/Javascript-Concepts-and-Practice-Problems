import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ show, onClose, title, children }) => {
  return (
    <>
      {show && (
        <>
          <div className={styles.modal_backdrop} onClick={onClose}></div>
          <div className={styles.modal}>
            <header className={styles.modal_header}>
              <div className={styles.modal_title}>{title}</div>
              <span onClick={onClose} className={styles.modal_close_icon}>
                X
              </span>
            </header>
            <div>{children}</div>
            <button onClick={onClose} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.any,
};
