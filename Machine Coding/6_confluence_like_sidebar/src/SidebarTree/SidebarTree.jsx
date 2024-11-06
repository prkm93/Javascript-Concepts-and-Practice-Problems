import { motion, AnimatePresence } from 'framer-motion';
import Node from './Node';
import styles from './SidebarTree.module.css';
import PropTypes from 'prop-types';

const SidebarTree = ({ nodes }) => {
  return (
    <ul className={styles.ul}>
      {nodes.map((item) => {
        return <Node key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default SidebarTree;

SidebarTree.propTypes = {
  nodes: PropTypes.array,
};
