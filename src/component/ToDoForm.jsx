import { Button } from "react-bootstrap";
import { ToDoItem } from "./ToDoItem";
import { Preloader } from "./common/Preloader";
import { todoAPI } from "../api/api";
export const ToDoForm = (props) => {
  //console.log("props-ToDoForm: ", props);


  // вызов колбэков которые приходят в пропсах
  const onAddNewTask = () => {
    props.onAddNewTaskThunkCreator(props.newTaskText);
  };

  // вызов колбэков которые приходят в пропсах
  const onTaskChange = (e) => {
    let text = e.target.value;
    props.updateNewTaskText(text);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
  }; */

  return (
    /*  <form className="mb-3 input-group" onSubmit={handleSubmit}> */
    <>
      {props.isFetching ? <Preloader /> : null}
      <div>
        <div>
          <input className="form-control" value={props.newTaskText} onChange={onTaskChange} />
          <Button onClick={onAddNewTask} type="submit" variant="danger" id="button-addon1">
            Добавить
          </Button>
        </div>
        {props.tasks.map((task) => {
          return (
            <ToDoItem
              task={task}
              key={task.id}
              /*   deleteTask={props.deleteTask} */
              /*    toggleTaskInCompleted={props.toggleTaskInCompleted} */
              /*       toggleCompletionProgress={props.toggleCompletionProgress} */
              completionInProgress={props.completionInProgress}
              isFetching={props.isFetching}
              /*  toggleIsFetching={props.toggleIsFetching} */
              putCompletedThunkCreator={props.putCompletedThunkCreator}
              removeTaskThunkCreator={props.removeTaskThunkCreator}
            />
          );
        })}
      </div>
    </>

    /*   </form> */
  );
};
