import ToDoFormContainer from './ToDoFormContainer';
import style from './Style/ToDo.module.scss';

export const ToDo: React.FC = () => {

  return (
    <div className={style.todo}>
      <h1>ToDo</h1>
      <ToDoFormContainer />
    </div>
  );
};
