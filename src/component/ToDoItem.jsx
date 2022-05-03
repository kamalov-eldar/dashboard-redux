import React from "react";
import { Button } from "react-bootstrap";
import { todoAPI } from "../api/api";
import axios from "axios";

export const ToDoItem = (props) => {
  //console.log("props-ToDoItem: ", props);

  // выполненая задача
  const toggleComplete = (task) => {
    props.putCompletedThunkCreator(task);
  };
  // удаление задачи
  const removeTask = (id) => {
    props.removeTaskThunkCreator(id);
  };

  return (
    <div className={props.task.done ? "input-group input-group_completed" : "input-group"}>
      <span className="input-group-text">
        <input
          className="form-check-input"
          type="checkbox"
          onChange={() => toggleComplete(props.task)}
          checked={props.task.done}
          disabled={props.isFetching}
          /*  props.completionInProgress.some((id) => {
            return id === props.task.id;
          }) */
        />
      </span>
      <span className="form-control">{props.task.title}</span>
      {props.task.done ? (
        <Button variant="danger" disabled={props.isFetching} onClick={() => removeTask(props.task.id)}>
          X
        </Button>
      ) : null}
    </div>
  );
};
