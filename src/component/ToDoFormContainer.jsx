import React from "react";
import { connect } from "react-redux";
import {
  addNewTaskAC,
  updateNewTaskTextAC,
  setTasksAC,
  toggleTaskInCompletedAC,
  toggleCompletionProgressAC,
  toggleIsFetchingAC,
  deleteTaskAC,
  getTasksThunkCreator,
  putCompletedThunkCreator,
} from "../redux/todo-reducer";
import { ToDoForm } from "./ToDoForm";
import { todoAPI } from "../api/api";
import axios from "axios";

class ToDoFormContainer extends React.Component {
  componentDidMount() {
    console.log("componentDidMount: ");
    //this.props.getTasks();
    //this.props.toggleIsFetching(true);
    todoAPI.getTasksAPI().then((tasks) => {
      this.props.setTasks(tasks);
      //this.props.toggleIsFetching(false);
    });
  }

  render() {
    //console.log("props-ToDoFormContainer", this.props);
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
  console.log("state-mapStateToProps: ", state);
  return {
    tasks: state.todo.tasks,
    newTaskText: state.todo.newTaskText,
    completionInProgress: state.todo.completionInProgress,
    isFetching: state.todo.isFetching,
  };
};

// передаем колбэки в компонент ToDoFormContainer
let mapDispatchToProps = (dispatch) => {
  return {
    /*   updateNewTaskText: updateNewTaskTextAC,
    addNewTask: addNewTaskAC,
    setTasks: setTasksAC, */
    updateNewTaskText: (newText) => {
      dispatch(updateNewTaskTextAC(newText));
    },
    addNewTask: (taskText) => {
      console.log("addNewTask");
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
    toggleCompletionProgress: toggleCompletionProgressAC,
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching));
    },
    putCompletedThunkCreator: putCompletedThunkCreator,
    /*  getTasksThunk: () => {
      console.log("dispatch-mapDispatchToProps", dispatch);
      dispatch(getTasksThunkCreator());
    }, */
    //getTasks: getTasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoFormContainer); // (ToDoFormContainer) на второй вызов передается комп вокргу котор создается контайнерная компонента
// connect сам вызовет переданн функц (mapStateToProps, mapDispatchToProps)
