import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import { TbPointFilled } from 'react-icons/tb';
import styles from './Icon.module.css';

const Icon = ({ toggle, hasParentNode, onClick }) => {
  return hasParentNode ? (
    <motion.span
      onClick={onClick}
      animate={{
        rotate: toggle ? 90 : 0,
      }}
      transition={{
        duration: 0.3,
      }}>
      <FaChevronRight className={styles.icon} />
    </motion.span>
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
