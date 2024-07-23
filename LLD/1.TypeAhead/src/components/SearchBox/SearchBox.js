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
    listItemRender,
    noItemMsg,
    errorMsg,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [userList, error] = useFetch(searchText);

  const handleChange = (e) => {
    setSearchText(e.target.value);
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
      />
      {userList && userList.length > 0 && listItemRender(userList)}
    </div>
  );
};

export default SearchBox;
