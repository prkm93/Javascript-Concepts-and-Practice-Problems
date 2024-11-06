import PropTypes from 'prop-types';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { TbPointFilled } from 'react-icons/tb';
import styles from './Icon.module.css';

const Icon = ({ toggle, hasParentNode, onClick }) => {
  return hasParentNode ? (
    <span onClick={onClick}>
      {toggle ? (
        <FaChevronDown className={styles.icon} />
      ) : (
        <FaChevronRight className={styles.icon} />
      )}
    </span>
  ) : (
    <TbPointFilled />
  );
};

export default Icon;

Icon.propTypes = {
  toggle: PropTypes.bool,
  hasParentNode: PropTypes.bool,
  onClick: PropTypes.func,
};
