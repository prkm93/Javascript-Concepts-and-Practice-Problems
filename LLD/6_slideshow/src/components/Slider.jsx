import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import styles from "./Slider.module.css";
import { images } from "../data";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickLeft = () => {
    if (0 === currentIndex) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex((index) => index - 1);
    }
  };

  const handleClickRight = () => {
    if (images.length - 1 === currentIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  return (
    <div className={styles.slide_wrapper}>
      <div className={styles.slide_container}>
        <div className={styles.slide_img_section}>
          <img
            className={styles.slide_img}
            src={images[currentIndex].image_url}
            alt={images[currentIndex].caption}
          />
          <button className={styles.left_icon} onClick={handleClickLeft}>
            <FaChevronLeft />
          </button>
          <button className={styles.right_icon} onClick={handleClickRight}>
            <FaChevronRight />
          </button>
        </div>
        <div className={styles.slide_indicators}>
          {images.map((_, index) => {
            return (
              <div
                key={index}
                className={`${
                  currentIndex === index ? styles.slide_indicator_active : ""
                } ${styles.slide_indicator}`}
                onClick={() => setCurrentIndex(index)}></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
