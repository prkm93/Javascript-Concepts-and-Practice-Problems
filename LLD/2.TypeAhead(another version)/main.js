// class
import { fakeFetch } from "./data";
const searchBox = document.getElementById("autocomplete-searchbox");
const listItemsBox = document.getElementById("list-box");

// const results = () => {
//   const data = fakeFetch("https://example.com/api/states")
//     .then((data) => {
//       console.log(data.data);
//       data.data.forEach((item) => {
//         listItemsBox.innerHTML += `<li>${item}</li>`;
//       });
//     })
//     .catch((error) => console.error(error));
//   return data;
// };

// results();
console.log(listItemsBox);
const handleSearch = (e) => {
  console.log(e.target.value);
  const word = e.target.value;
  fakeFetch("https://example.com/api/states")
    .then((data) => {
      console.log(data.data);
      data.data.filter((item) => {
        if (item.toLowerCase().includes(word.toLowerCase())) {
          listItemsBox.innerHTML += `<li>${item}</li>`;
        }
      });
    })
    .catch((error) => console.error(error));
};

searchBox.addEventListener("input", handleSearch);
