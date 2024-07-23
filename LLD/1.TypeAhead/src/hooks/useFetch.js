import { useState, useEffect, useRef } from "react";

export const useFetch = (
  promise,
  searchText,
  transformData,
  debounceDelay,
  autoComplete
) => {
  const [userList, setUserList] = useState(null);
  const timer = useRef(null);
  const [error, setError] = useState("");

  const fetchList = async () => {
    try {
      const response = await promise(searchText);
      const data = await response.json();
      setUserList(transformData(data));
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  useEffect(() => {
    if (!autoComplete) {
      return;
    }
    if (searchText.length > 0) {
      timer.current = setTimeout(() => {
        fetchList();
      }, debounceDelay);
    }

    if (!searchText) {
      setUserList(null);
      setError("");
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [searchText, autoComplete]);

  return [userList, setUserList, error];
};
