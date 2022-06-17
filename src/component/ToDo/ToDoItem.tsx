import { Button } from 'react-bootstrap';
import { TaskType } from '../../../types/types';
import style from './Style/ToDo.module.scss';

type PropsType = {
  task: TaskType;
  key: string;
  isFetching: boolean;
  putCompleted: (task: TaskType) => void;
  removeTask: (id: string) => void;
};

export const ToDoItem: React.FC<PropsType> = (props) => {

  return (
    <div className={props.task.done ? `input-group ${style.input__completed}` : `input-group`}>
      <span className={`input-group-text`}>
        <input
          className={style.todo__task}
          type="checkbox"
          onChange={() =>  props.putCompleted(props.task)}
          checked={props.task.done}
        />
      </span>
      <span className={style.todo__text + ' ' + 'form-control'}>{props.task.title}</span>
      {props.task.done ? (
        <Button
          className={style.btn__del}
          variant="danger"
          onClick={() => props.removeTask(props.task.id)}
        >
          X
        </Button>
      ) : null}
    </div>
  );
};
