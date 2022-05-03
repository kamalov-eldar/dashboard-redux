import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ToDoItem } from "./ToDoItem";
import { Preloader } from "./common/Preloader";
import { todoAPI } from "../api/api";
export const ToDoForm = (props) => {
  console.log("props-ToDoForm: ", props);
  //console.log("props-tasks-ToDoForm: ", props.tasks);

  // вызов колбэков которые приходят в пропсах
  const onAddNewTask = () => {
    props.toggleIsFetching(true);
    //props.toggleCompletionProgress(true, task.id); // disabled эл-нт пока не пришел ответ от сервера
    todoAPI
      .addTaskAPI(props.newTaskText)
      .then((response) => {
        if (response.data.status === "success") {
        }
      })
      .then((response) => {
        todoAPI.getTasksAPI().then((tasks) => {
          props.setTasks(tasks);
        });
        props.toggleIsFetching(false);
      });
  };

  // вызов колбэков которые приходят в пропсах
  const onTaskChange = (e) => {
    let text = e.target.value;
    props.updateNewTaskText(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    /*  <form className="mb-3 input-group" onSubmit={handleSubmit}> */
    <>
      {props.isFetching ? <Preloader /> : null}
      <div>
        <div>
          <input className="form-control" value={props.newTaskText} onChange={onTaskChange} />
          <Button
            onClick={() => {
              onAddNewTask();
            }}
            type="submit"
            variant="danger"
            id="button-addon1"
          >
            Добавить
          </Button>
        </div>
        {props.tasks.map((task) => {
          // console.log("tasks.map", task);
          return (
            <ToDoItem
              task={task}
              key={task.id}
              deleteTask={props.deleteTask}
              toggleTaskInCompleted={props.toggleTaskInCompleted}
              toggleCompletionProgress={props.toggleCompletionProgress}
              completionInProgress={props.completionInProgress}
              isFetching={props.isFetching}
              toggleIsFetching={props.toggleIsFetching}
              putCompletedThunkCreator={props.putCompletedThunkCreator}
            />
          );
        })}
      </div>
    </>

    /*   </form> */
  );
};
