import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TaskType } from '../../../types/types';
import { AppSateType } from '../../redux/redux-store';
import { ActionsTypes } from '../../redux/todo-reducer';
import { getTasksThunkCreator, removeTaskThunkCreator, putCompletedThunkCreator, onAddNewTaskThunkCreator, actions } from '../../redux/todo-reducer';
import { ToDoForm } from './ToDoForm';

type PropsType = MapStatePropsType & MapDispatchPropsType;

const ToDoFormContainer: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.getTasks();
    }, []);

    return (
        <ToDoForm
            newTaskText={props.newTaskText}
            isFetching={props.isFetching}
            tasks={props.tasks}
            putCompleted={props.onPutCompleted}
            removeTask={props.onRemoveTask}
            onAddNewTask={props.onAddNewTask}
            updateNewTaskText={props.updateNewTaskText}
        />
    );
};

//  передаем state в компонент ToDoFormContainer
type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: AppSateType) => {
    return {
        tasks: state.todo.tasks, // если изм этот обьект тогда перерисуйся
        newTaskText: state.todo.newTaskText,
        isFetching: state.todo.isFetching,
    };
};

// передаем колбэки в компонент ToDoFormContainer
const mapDispatchToProps = (dispatch: ThunkDispatch<AppSateType, any, ActionsTypes>) => {
    return {
        updateNewTaskText: (newText: string) => {
            dispatch(actions.updateNewTaskTextAC(newText));
        },
        onRemoveTask: (id: string) => {
            dispatch(removeTaskThunkCreator(id));
        },
        onPutCompleted: (task: TaskType) => {
            dispatch(putCompletedThunkCreator(task));
        },
        getTasks: () => {
            dispatch(getTasksThunkCreator());
        },
        onAddNewTask: (newTaskText: string) => {
            dispatch(onAddNewTaskThunkCreator(newTaskText));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFormContainer);
// (ToDoFormContainer) на второй вызов передается комп вокргу котор создается контайнерная компонента

// connect сам вызовет переданн функц (mapStateToProps, mapDispatchToProps)
