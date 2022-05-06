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
    /*  todoAPI.getTasksAPI().then((tasks) => {
      this.props.setTasks(tasks);
    }); */
  }

  componentDidUpdate() {
    this.props.todoCount(this.props.tasks.length);
  }

  render() {
    //console.log("props-ToDoFormContainer", this.props);
    //console.log("render-ToDoFormContainer");
    return (
      <ToDoForm
        {...this.props}
        // completionInProgress={this.props.completionInProgress}
        //  addNewTask={props.addNewTask}
        //updateNewTaskText={props.updateNewTaskText}
        // tasks={this.props.tasks}
        //newTaskText={props.newTaskTex}
      />
    );
  }
}

//  передаем state в компонент ToDoFormContainer
let mapStateToProps = (state) => {
  //console.log("state-ToDoFormContainer: ", state);
  return {
    tasks: state.todo.tasks, // если изм этот обьект тогда перерисуйся
    newTaskText: state.todo.newTaskText,
    isFetching: state.todo.isFetching,
    inputDisabled: state.todo.inputDisabled,
  };
};

// передаем колбэки в компонент ToDoFormContainer
// dispatch = store.dispatch.bind(store)
let mapDispatchToProps = (dispatch) => {
  //console.log("dispatch-mapDispatchToProps: ", dispatch);
  return {
    /* setTasks: setTasksAC, */
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
