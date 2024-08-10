import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PropTypes from "prop-types";

import Slide from "./Slide";
import Dots from "./Dots";
import styles from "./Slider.module.css";

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    }
  };

  const handleClickNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((index) => index + 1);
    }
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className={styles.slide_wrapper}>
      <div className={styles.slide_container}>
        <div className={styles.slide_img_section}>
          {images.map((image, index) => {
            return (
              <Slide key={index} {...image} active={index === currentIndex} />
            );
          })}
          <button className={styles.left_icon} onClick={handleClickPrev}>
            <FaChevronLeft />
          </button>
          <button className={styles.right_icon} onClick={handleClickNext}>
            <FaChevronRight />
          </button>
        </div>
        <Dots
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default Slider;

Slider.propTypes = {
  images: PropTypes.array,
};
