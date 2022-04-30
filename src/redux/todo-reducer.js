import { todoAPI } from "../api/api";

const ADD_TASK = "ADD-TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_NEW_TASK = "UPDATE-NEW-TASK";
const SET_TASKS = "SET_TASKS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";

const TOGGLE_IS_COMPLETION_PROGRESS = "TOGGLE_IS_COMPLETION_PROGRESS";

let initialState = {
  tasks: [
    /*  { done: false, id: "8278e35a-d006-42d8-8ab7-27fe8591ce4c", title: "Зададча 1", description: null },
    { done: false, id: "fc8a623d-bee2-4cdb-b466-951cbd425e6d", title: "Зададча 2", description: null },
    { done: false, id: "48e8dd30-eb01-4eec-91de-aac45de27027", title: "Зададча 3", description: null }, */
  ],
  newTaskText: "",
  completionInProgress: [],
  isFetching: false,
};

/* const getTasks = async () => {
  const promise = axios.get(`https://repetitora.net/api/js/tasks?widgetid=987654`);
  const response = await promise;
  console.log("response-todoReducer: ", response);
  return response.data;
}; */

/*
if (state === undefined) {
  const promise = axios.get("https://repetitora.net/api/js/tasks?widgetid=987654").then((response) => {
    console.log("response-undefined: ", response.data);
    return promise;
    return response.data;
    //props.setUsers(response.data.items);
  });
} */

const todoReducer = (state = initialState, action) => {
  console.log("state-todoReducer: ", state);

  //console.log("action-todoReducer", action);
  switch (action.type) {
    case ADD_TASK: {
      console.log("action-ADD_TASK", action);
      return {
        ...state, // поверхностная копия обьекта
        // tasks: [...state.tasks, { title: action.taskText }],
        tasks: [...state.tasks],
      };
    }
    case DELETE_TASK: {
      console.log("DELETE_TASK", action);
      return {
        ...state, // поверхностная копия обьекта
        tasks: [...state.tasks.filter((task) => task.id !== action.taskId)],
      };
    }
    case UPDATE_NEW_TASK: {
      return {
        ...state,
        newTaskText: action.newText,
      };
    }
    case SET_TASKS: {
      //console.log("GET_TASKS-state", state);
      return {
        ...state, // поверхностная копия обьекта
        tasks: [...action.tasks], // , ...action.tasks склеиваем два массива старых пользователей (...state.tasks) и новых что пришли из актион (...action.tasks)
      };
    }
    case TOGGLE_IS_COMPLETION_PROGRESS: {
      //console.log("state", state);
      return {
        ...state,
        completionInProgress: action.isFetching
          ? [...state.completionInProgress, action.taskId]
          : state.completionInProgress.filter((id) => id !== action.taskId),
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case TOGGLE_COMPLETED: {
      //console.log("state-TOGGLE_COMPLETED", state);
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskId) {
            return { ...task, done: !task.done }; // если id совп возвращаем изм копию task
          }
          return task; // если id не совп возвращаем копию task без изменений
        }),
      };
    }
    default:
      return state;
  }
};

export const addNewTaskAC = (taskText) => ({ type: ADD_TASK, taskText: taskText });
export const deleteTaskAC = (taskId) => ({ type: DELETE_TASK, taskId });
export const updateNewTaskTextAC = (newText) => ({ type: UPDATE_NEW_TASK, newText: newText });
export const setTasksAC = (tasks) => ({ type: SET_TASKS, tasks });
export const toggleTaskInCompletedAC = (taskId) => ({ type: TOGGLE_COMPLETED, taskId });
export const toggleCompletionProgressAC = (isFetching, taskId) => ({
  type: TOGGLE_IS_COMPLETION_PROGRESS,
  isFetching,
  taskId,
});
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const putCompletedThunkCreator = (task) => {
  console.log("putCompletedThunkCreator:");

  return (dispatch) => {
    console.log("putCompletedThunkCreator:2");
    dispatch(toggleCompletionProgressAC(true, task.id)); // disabled эл-нт пока не пришел ответ от сервера
    dispatch(toggleIsFetchingAC(true));
    todoAPI.putCompletedAPI(task).then((response) => {
      if (response.data.status === "success") {
        dispatch(toggleTaskInCompletedAC(task.id));
      }
      dispatch(toggleCompletionProgressAC(false, task.id));
      dispatch(toggleIsFetchingAC(false));
    });
  };
};

/* todoAPI.getTasksAPI().then((tasks) => {
    //dispatch(setTasks(tasks));
   // dispatch(toggleIsFetching(false));
  //dispatch(toggleIsFetching(true));
  });
}*/

/* export const putCompletedThunk = (task) => (dispatch) => {
  console.log("putCompleted-dispatch", dispatch);
  dispatch(toggleIsFetching(true));
  todoAPI.putCompleted(task).then((response) => {
    if (response.data.status === "success") {
      dispatch(toggleTaskInCompleted(task.id));
    }
    dispatch(toggleCompletionProgress(false, task.id));
    dispatch(toggleIsFetching(false));
  });
}; */

export default todoReducer;
