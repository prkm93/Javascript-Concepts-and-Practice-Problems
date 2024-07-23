import React from "react";

const ListBox = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={`${item.name}-${item.birth_year}`}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListBox;
