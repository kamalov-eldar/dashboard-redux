import { TaskType } from "../../types/types";
import { todoAPI } from "../api/api";
import { BaseThunkType, InferActionsTypes } from './redux-store';


let initialState = {
  tasks: [] as Array<TaskType>,
  newTaskText: "" as string,
  isFetching: false as boolean,
};

export type initialStateType = typeof initialState
// Reducer обновляет state 
const todoReducer = (state = initialState, action:ActionsTypes):initialStateType => {
  console.log('action: ', action.type);

  switch (action.type) {
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, {
          done: false,
          id: String(state.tasks.length),
          title: action.newText,
          description: null } ],
     };
    }
    case "DELETE_TASK": {
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.taskId)],
     };
    }
    case "UPDATE_NEW_TASK_TEXT": {
      return {
        ...state,
        newTaskText: action.newText,
      };
    }
    case "SET_TASKS": {
      return {
        ...state,
        tasks: [...action.tasks],
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "TOGGLE_COMPLETED": {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskId) {
            return { ...task, done: !task.done }; // если id совп возвращаем изм копию объекта task
          }
          return task; // если id не совп возвращаем объект task без изменений
        }),
      };
    }
    default:
      return state;
  }
};

export type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  addTaskAC: (newText:string) => ({ type: "ADD_TASK", newText}  as const),
  deleteTaskAC:(taskId:string) => ({ type: "DELETE_TASK", taskId }  as const),
  updateNewTaskTextAC: (newText: string) => ({ type: "UPDATE_NEW_TASK_TEXT", newText: newText } as const),
  setTasksAC: (tasks: Array<TaskType>) => ({ type: "SET_TASKS", tasks } as const),
  toggleTaskInCompletedAC : (taskId:string) => ({ type: "TOGGLE_COMPLETED", taskId } as const),
  toggleIsFetchingAC:( isFetching: boolean) => ({ type: "TOGGLE_IS_FETCHING", isFetching } as const)
}

/**********************************************************************************************************/

type ThunkType = BaseThunkType<ActionsTypes>

export const getTasksThunkCreator = ():ThunkType => (dispatch) => {
  todoAPI.getTasksAPI().then((tasks) => {
    dispatch(actions.setTasksAC(tasks));
  });
};
export const putCompletedThunkCreator = (task:TaskType):ThunkType => {
  return (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.toggleTaskInCompletedAC(task.id));
    todoAPI.putCompletedAPI(task).then((response) => {
      dispatch(actions.toggleIsFetchingAC(false));
    });
  };
};

export const removeTaskThunkCreator = (id:string):ThunkType => {
  return (dispatch) => {
    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.deleteTaskAC(id));
    todoAPI.removeTaskAPI(id).then((response) => {
      dispatch(actions.toggleIsFetchingAC(false));
    });
  };
};

export const onAddNewTaskThunkCreator = (newTaskText:string):ThunkType => {
  return (dispatch) => {
    dispatch(actions.addTaskAC(newTaskText));
    dispatch(actions.updateNewTaskTextAC(""));
    dispatch(actions.toggleIsFetchingAC(true));
    todoAPI
      .addTaskAPI(newTaskText)
      .then(() => {
        todoAPI.getTasksAPI().then((tasks) => {
          dispatch(actions.setTasksAC(tasks));
        });
        dispatch(actions.toggleIsFetchingAC(false));
      });
  };
};

export default todoReducer;
