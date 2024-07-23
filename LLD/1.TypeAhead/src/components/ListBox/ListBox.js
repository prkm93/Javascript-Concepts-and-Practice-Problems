import React from "react";
import styles from "./ListBox.module.css";

const ListBox = ({ items, activeIndex, searchText, onClickHandler }) => {
  return (
    <ul className={styles.ul}>
      {items.map((item, index) => {
        const splittedText = item.name.split(searchText);
        return (
          <li
            className={`${
              activeIndex === index ? styles.li_select : styles.li
            }`}
            key={`${item.name}-${item.birth_year}`}
            onClick={() => onClickHandler(item.name)}>
            {splittedText[0]}
            <span className={styles.highlight}>{searchText}</span>
            {splittedText[1]}
          </li>
        );
      })}
    </ul>
  );
};

export default ListBox;
