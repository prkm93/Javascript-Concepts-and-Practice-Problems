import PropTypes from "prop-types";
import styles from "./Dots.module.css";

const Dots = ({ images, currentIndex, setCurrentIndex }) => {
  return (
    <div className={styles.slide_indicators}>
      {images.map((_, index) => {
        return (
          <div
            key={index}
            className={`${
              currentIndex === index ? styles.slide_indicator_active : ""
            } ${styles.slide_indicator}`}
            onClick={() => setCurrentIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default Dots;

Dots.propTypes = {
  images: PropTypes.array,
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};
