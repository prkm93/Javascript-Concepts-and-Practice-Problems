import PropTypes from 'prop-types';
import styles from './Chart.module.css';

const Chart = (props) => {
  return (
    <div
      className={styles.bar}
      style={{
        height: `${props.percTicket * 10}px`,
        backgroundColor: `${props.colour}`,
      }}>
      <span className={styles.tooltipText}>
        {props.name}-{props.ticketCount}
      </span>
    </div>
  );
};

export default Chart;

Chart.propTypes = {
  percTicket: PropTypes.number,
  colour: PropTypes.string,
  name: PropTypes.string,
  ticketCount: PropTypes.number,
};
