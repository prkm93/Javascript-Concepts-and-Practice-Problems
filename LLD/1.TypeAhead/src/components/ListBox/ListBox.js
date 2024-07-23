import React from "react";
import styles from "./ListBox.module.css";

const ListBox = ({ items, activeIndex, onClickHandler }) => {
  return (
    <ul className={styles.ul}>
      {items.map((item, index) => (
        <li
          className={`${activeIndex === index ? styles.li_select : styles.li}`}
          key={`${item.name}-${item.birth_year}`}
          onClick={() => onClickHandler(item.name)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListBox;
