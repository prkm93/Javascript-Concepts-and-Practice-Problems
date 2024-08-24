import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styles from "./Todo.module.css";

const Todo = ({ todosList }) => {
  const [newTodo, setNewTodo] = useState("");
  const [tasksList, setTasksList] = useState(todosList);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTodo) {
      return;
    }

    const newId = uuid();

    setTasksList([
      ...tasksList,
      {
        id: newId,
        todo: newTodo,
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const handleToggleTask = (id) => {
    const newList = tasksList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    setTasksList(newList);
  };

  return (
    <div className={styles.todo_container}>
      <form onSubmit={handleAddTask} className={styles.form_container}>
        <input
          className={styles.input}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit" className={styles.add_btn}>
          Add Task
        </button>
      </form>
      <ul>
        {tasksList?.map((todoItem) => {
          const { id, todo, completed } = todoItem;
          return (
            <li key={id} className={styles.task_list}>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => handleToggleTask(id)}
              />
              <label
                htmlFor={todo}
                className={`${
                  completed ? styles.todo_task_completed : styles.todo_task
                }`}>
                {todo}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;

Todo.propTypes = {
  todosList: PropTypes.array,
};
