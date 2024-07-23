import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import styles from "./SearchBox.module.css";

const SearchBox = (props) => {
  const {
    label,
    name,
    inputType,
    id,
    placeholder,
    autoComplete,
    debounceDelay,
    listItemRender,
    noItemMsg,
    errorMsg,
    promise,
    transformData,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
  const [userList, setUserList, error] = useFetch(
    promise,
    searchText,
    transformData,
    debounceDelay,
    isAutoComplete
  );

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyUp = (e) => {
    const keyCode = e.keyCode;

    setIsAutoComplete(true);

    if (!userList || userList.length === 0) {
      return;
    }
    if (keyCode === 13) {
      // user enter
      if (activeIndex === null) return;

      setSearchText(userList[activeIndex].name);
      setUserList(null);
      setActiveIndex(null);
      setIsAutoComplete(false);
      return;
    }

    if (keyCode === 40) {
      // user has moved down
      if (activeIndex === null || activeIndex === userList.length - 1) {
        // when pointer not set or is at last item
        setActiveIndex(0);
      } else {
        setActiveIndex((prevIndex) => prevIndex + 1);
      }
    } else if (keyCode === 38) {
      // user moved up
      if (activeIndex === 0) {
        // when at first item
        setActiveIndex(userList.length - 1);
      } else {
        setActiveIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const onClickHandler = (name) => {
    setSearchText(name);
    setUserList(null);
    setActiveIndex(null);
    setIsAutoComplete(false);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        className={styles.input}
        type={inputType}
        id={id}
        name={name}
        placeholder={placeholder}
        value={searchText}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {autoComplete && (
        <>
          {userList &&
            userList.length > 0 &&
            listItemRender(userList, activeIndex, searchText, onClickHandler)}
          {searchText.length > 0 && userList?.length === 0 && noItemMsg()}
          {error && errorMsg()}
        </>
      )}
    </div>
  );
};

export default SearchBox;
