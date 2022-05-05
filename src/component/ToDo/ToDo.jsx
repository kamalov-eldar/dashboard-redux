import { useState } from "react";
import ToDoFormContainer from "./ToDoFormContainer";
import style from "./Style/ToDo.module.css";

export const ToDo = (props) => {
  const [countToDo, setCountToDo] = useState("");
  const todoCount = (value) => {
    setCountToDo(value);
  };
  return (
    <div className={style.todo}>
      <h1>ToDo</h1>
      <h2>Список задач {countToDo}</h2>
      <ToDoFormContainer todoCount={todoCount} />
    </div>
  );
};
