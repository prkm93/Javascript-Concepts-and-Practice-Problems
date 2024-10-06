import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './Chart.module.css';

const Chart = (props) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: `${props.percTicket * 10}px` }}
      exit={{ height: 0 }}
      transition={{ duration: 1 }}
      className={styles.bar}
      style={{
        backgroundColor: `${props.colour}`,
      }}>
      <span className={styles.tooltipText}>
        {props.name} - {props.ticketCount}
      </span>
    </motion.div>
  );
};

export default Chart;

Chart.propTypes = {
  percTicket: PropTypes.number,
  colour: PropTypes.string,
  name: PropTypes.string,
  ticketCount: PropTypes.number,
};
