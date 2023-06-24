import { Button } from 'react-bootstrap';
import { ToDoItem } from './ToDoItem';
import style from './Style/ToDo.module.scss';
import Preloader from '../Preloader/Preloader';
import { ChangeEvent } from 'react';
import { TaskType } from '../../../types/types';

type PropsType = {
    newTaskText: string;
    isFetching: boolean;
    tasks: Array<TaskType>;
    putCompleted: (task: TaskType) => void;
    removeTask: (id: string) => void;
    onAddNewTask: (text: string) => void;
    updateNewTaskText: (text: string) => void;
};

export const ToDoForm: React.FC<PropsType> = (props) => {
    return (
        <>
            {/*  {props.isFetching ? <Preloader /> : null} */}
            <div>
                <h2>Список задач {props.tasks.length}</h2>
                <InputToDo newTaskText={props.newTaskText} isFetching={props.isFetching} updateNewTaskText={props.updateNewTaskText} onAddNewTask={props.onAddNewTask} />
                {props.tasks.map((task) => {
                    return <ToDoItem task={task} key={task.id} isFetching={props.isFetching} putCompleted={props.putCompleted} removeTask={props.removeTask} />;
                })}
            </div>
        </>
    );
};

type PropsInputType = {
    newTaskText: string;
    isFetching: boolean;
    onAddNewTask: (text: string) => void;
    updateNewTaskText: (text: string) => void;
};

const InputToDo: React.FC<PropsInputType> = (props) => {
    console.log('InputToDo');
    const AddNewTask = (newTaskText: string) => {
        props.onAddNewTask(newTaskText);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'NumpadEnter' && !props.isFetching) {
            props.onAddNewTask(props.newTaskText);
        }
    };

    const onTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        props.updateNewTaskText(text);
    };

    return (
        <div className={style.todo__form}>
            <input className={style.todo__input + ' ' + 'form-control'} value={props.newTaskText} onChange={onTaskChange} onKeyDown={onKeyDown} />
            <Button onClick={() => AddNewTask} type='submit' variant='danger' disabled={props.isFetching}>
                Добавить
            </Button>
        </div>
    );
};
