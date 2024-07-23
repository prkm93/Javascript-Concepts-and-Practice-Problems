import SearchBox from "./components/SearchBox";
import ListBox from "./components/ListBox";
import "./App.css";

function App() {
  document.title = "TypeAhead/AutoComplete";
  return (
    <div>
      <SearchBox
        label="Enter your search text below: "
        inputType="text"
        id="username"
        name="username"
        placeholder="Enter your favourite character here.."
        autoComplete={true}
        debounceDelay={500}
        listItemRender={(items) => <ListBox items={items} />}
        noItemMsg={() => <div>No users found!</div>}
        errorMsg={() => <div>Something went wrong!</div>}
      />
    </div>
  );
}

export default App;

/**
 * {
    "2": 2,
    "3": 1,
    "4": 1,
    "5": 1,
    "L": 3,
    "u": 3,
    "k": 4,
    "e": 9,
    " ": 8,
    "S": 1,
    "y": 1,
    "w": 2,
    "a": 10,
    "l": 3,
    "r": 9,
    "-": 31,
    "C": 1,
    "P": 1,
    "O": 4,
    "R": 2,
    "D": 4,
    "t": 3,
    "h": 3,
    "V": 1,
    "d": 1,
    "i": 6,
    "g": 4,
    "n": 5,
    "s": 4,
    "B": 2,
    "W": 2,
    "b": 2,
    "K": 1,
    "o": 1
}
 */
