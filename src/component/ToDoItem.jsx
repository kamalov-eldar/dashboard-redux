import { Button } from "react-bootstrap";

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
          disabled={props.inputDisabled.some((id) => id === props.task.id)}
          /*  props.completionInProgress.some((id) => {
            return id === props.task.id;
          }) */
        />
      </span>
      <span className="form-control">{props.task.title}</span>
      {props.task.done ? (
        <Button
          variant="danger"
          disabled={props.inputDisabled.some((id) => id === props.task.id)}
          onClick={() => removeTask(props.task.id)}
        >
          X
        </Button>
      ) : null}
    </div>
  );
};
