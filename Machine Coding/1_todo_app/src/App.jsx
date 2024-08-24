import Todo from "./component/Todo";
import { todosList } from "./data/todos";

function App() {
  return (
    <>
      <Todo todosList={todosList} />
    </>
  );
}

export default App;

/**
 *
 */
