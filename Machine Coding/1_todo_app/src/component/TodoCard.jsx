import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TodoCard.module.css";

const TodoCard = ({
  item,
  handleDeleteTask,
  handleToggleTask,
  handleEditTask,
}) => {
  const { id, todo, completed } = item;

  const [isEditOn, setIsEditOn] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  return (
    <li key={id} className={styles.task_list}>
      <div className={styles.checkbox_container}>
        <input
          className={isEditOn ? styles.checkbox : ""}
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleTask(id)}
        />
        {isEditOn ? (
          <div key={id}>
            <input
              id={id}
              className={styles.edit_input}
              type="text"
              value={editTodo.length > 0 ? editTodo : todo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
            <button
              className={styles.btn}
              id={id}
              onClick={() => {
                handleEditTask(item, editTodo);
                setIsEditOn(false);
              }}>
              Save
            </button>
            <button
              className={styles.btn}
              id={id}
              onClick={() => setIsEditOn(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <label
            htmlFor={todo}
            className={`${
              completed ? styles.todo_task_completed : styles.todo_task
            }`}>
            {todo}
          </label>
        )}
      </div>
      <div>
        <button onClick={() => setIsEditOn(true)}>Edit</button>
        <button onClick={() => handleDeleteTask(id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoCard;

TodoCard.propTypes = {
  item: PropTypes.object,
  handleDeleteTask: PropTypes.func,
  handleToggleTask: PropTypes.func,
  handleEditTask: PropTypes.func,
  isEditOn: PropTypes.bool,
};
