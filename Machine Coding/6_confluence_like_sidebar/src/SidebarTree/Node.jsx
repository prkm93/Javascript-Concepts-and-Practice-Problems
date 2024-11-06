import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import SidebarTree from './SidebarTree';
import Icon from './Icon';

import styles from './Node.module.css';

const Node = ({ label, link, children }) => {
  const [toggle, setToggle] = useState(false);

  const hasParentNode = Boolean(children && children.length > 0);

  return (
    <li className={styles.li}>
      <div className={styles.node}>
        <Icon
          toggle={toggle}
          hasParentNode={hasParentNode}
          onClick={() => setToggle((val) => !val)}
        />
        <a href={link} className={styles.linkItem}>
          {label}
        </a>
      </div>
      <AnimatePresence>
        {hasParentNode && toggle && (
          <motion.div
            variants={{
              collapsed: {
                height: 0,
                opacity: 0,
              },
              open: {
                height: 'auto',
                opacity: 1,
              },
            }}
            transition={{
              duration: 0.3,
            }}
            initial="collapsed"
            animate="open"
            exit="collapsed">
            <SidebarTree nodes={children} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Node;

Node.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.array,
};
