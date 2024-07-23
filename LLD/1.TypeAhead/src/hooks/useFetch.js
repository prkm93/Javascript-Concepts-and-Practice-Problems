import React, { useState, useEffect, useRef } from "react";

const API_URL = "https://swapi.dev/api/people";

export const useFetch = (searchText) => {
  const [userList, setUserList] = useState([]);
  const timer = useRef(null);
  const [error, setError] = useState("");

  const fetchList = async () => {
    try {
      const response = await fetch(`${API_URL}?search=${searchText}`);
      if (response.status === 200) {
        const data = await response.json();

        if (data.results.length > 0) {
          setUserList(data.results);
        }
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  useEffect(() => {
    if (searchText.length > 0) {
      timer.current = setTimeout(() => {
        fetchList();
      }, 500);
    }

    if (searchText.length === 0) {
      setUserList([]);
    }

    return () => clearTimeout(timer.current);
  }, [searchText]);

  return [userList, setUserList, error];
};
