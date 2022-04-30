import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ToDoFormContainer from "./ToDoFormContainer";

export const ToDo = (props) => {

  return (
    <div className="ToDo container">
      <h1>ToDo</h1>
      <h2>Список задач {"todos.length"}</h2>
      <ToDoFormContainer />
    </div>
  );
};
