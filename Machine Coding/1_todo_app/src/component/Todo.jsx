import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styles from "./Todo.module.css";
import TodoCard from "./TodoCard";

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
      {
        id: newId,
        todo: newTodo,
        completed: false,
      },
      ...tasksList,
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

  const handleEditTask = (item, editedTodo) => {
    const newList = tasksList.map((todoItem) => {
      if (item.id === todoItem.id) {
        return {
          ...todoItem,
          todo: editedTodo,
        };
      }
      return todoItem;
    });

    setTasksList(newList);
  };

  const handleDeleteTask = (id) => {
    const newList = tasksList.filter((item) => item.id !== id);
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
          const { id } = todoItem;
          return (
            <TodoCard
              key={id}
              item={todoItem}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleToggleTask={handleToggleTask}
            />
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
