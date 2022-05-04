import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ToDoFormContainer from "./ToDoFormContainer";

export const ToDo = (props) => {
  const [countToDo, setCountToDo] = useState("");
  const todoCount = (value) => {
    setCountToDo(value);
  };
  return (
    <div className="todo container">
      <h1>ToDo</h1>
      <h2>Список задач {countToDo}</h2>
      <ToDoFormContainer todoCount={todoCount} />
    </div>
  );
};
