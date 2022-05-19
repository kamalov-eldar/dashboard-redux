import React from "react";
import { connect } from "react-redux";
import {
  addNewTaskAC,
  updateNewTaskTextAC,
  setTasksAC,
  toggleTaskInCompletedAC,
  toggleIsFetchingAC,
  deleteTaskAC,
  getTasksThunkCreator,
  removeTaskThunkCreator,
  putCompletedThunkCreator,
  onAddNewTaskThunkCreator,
  toggleProgressDisabledInputAC,
} from "../../redux/todo-reducer";
import { ToDoForm } from "./ToDoForm";

class ToDoFormContainer extends React.Component {
  componentDidMount() {
    this.props.getTasksThunkCreator();
  }

  componentDidUpdate() {
    this.props.todoCount(this.props.tasks.length);
  }

  render() {
    return (
      <ToDoForm
        {...this.props}
      />
    );
  }
}

//  передаем state в компонент ToDoFormContainer
let mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks, // если изм этот обьект тогда перерисуйся
    newTaskText: state.todo.newTaskText,
    isFetching: state.todo.isFetching,
    inputDisabled: state.todo.inputDisabled,
  };
};

// передаем колбэки в компонент ToDoFormContainer
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewTaskText: (newText) => {
      dispatch(updateNewTaskTextAC(newText));
    },
    addNewTask: (taskText) => {
      dispatch(addNewTaskAC(taskText));
    },
    deleteTask: (taskId) => {
      dispatch(deleteTaskAC(taskId));
    },
    setTasks: (tasks) => {
      dispatch(setTasksAC(tasks));
    },
    toggleTaskInCompleted: (taskId) => {
      dispatch(toggleTaskInCompletedAC(taskId));
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching));
    },
    putCompletedThunkCreator: (task) => {
      dispatch(putCompletedThunkCreator(task));
    },
    removeTaskThunkCreator: (id) => {
      dispatch(removeTaskThunkCreator(id));
    },
    getTasksThunkCreator: () => {
      dispatch(getTasksThunkCreator());
    },
    onAddNewTaskThunkCreator: (newTaskText) => {
      dispatch(onAddNewTaskThunkCreator(newTaskText));
    },
    toggleProgressDisabledInput: () => {
      toggleProgressDisabledInputAC();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFormContainer); // (ToDoFormContainer) на второй вызов передается комп вокргу котор создается контайнерная компонента
// connect сам вызовет переданн функц (mapStateToProps, mapDispatchToProps)
