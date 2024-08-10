import propTypes from "prop-types";
import styles from "./Slide.module.css";

const Slide = ({ image_url, caption, active }) => {
  return (
    <img
      className={`${styles.slide_img} ${
        active ? styles.slide_img_active : " "
      }`}
      src={image_url}
      alt={caption}
    />
  );
};

export default Slide;

Slide.propTypes = {
  active: propTypes.bool,
  image_url: propTypes.string,
  caption: propTypes.string,
};
