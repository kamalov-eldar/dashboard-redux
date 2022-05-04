import { todoAPI } from "../api/api";

const ADD_TASK = "ADD-TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_NEW_TASK = "UPDATE-NEW-TASK";
const SET_TASKS = "SET_TASKS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";

const PROGRESS_DISABLED_INPUT = "PROGRESS_DISABLED_INPUT";

let initialState = {
  tasks: [
    /*  { done: false, id: "8278e35a-d006-42d8-8ab7-27fe8591ce4c", title: "Зададча 1", description: null },
    { done: false, id: "fc8a623d-bee2-4cdb-b466-951cbd425e6d", title: "Зададча 2", description: null },
    { done: false, id: "48e8dd30-eb01-4eec-91de-aac45de27027", title: "Зададча 3", description: null }, */
  ],
  newTaskText: "",
  isFetching: false,
  inputDisabled: [], // followingInProgress "72fceda9-53ce-4398-ba51-32961acc431a", "28a3f5ad-1933-4691-864f-7821b2dfd234"
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state, // поверхностная копия обьекта
        // tasks: [...state.tasks, { title: action.taskText }],
        tasks: [...state.tasks],
      };
    }
    case DELETE_TASK: {
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
      return {
        ...state, // поверхностная копия обьекта
        tasks: [...action.tasks],
        newTaskText: "",
      };
    }
    case PROGRESS_DISABLED_INPUT: {
      //console.log("state", state);
      return {
        ...state,
        inputDisabled: action.isFetching
          ? [...state.inputDisabled, action.taskId]
          : state.inputDisabled.filter((id) => id !== action.taskId),
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
export const toggleProgressDisabledInputAC = (isFetching, taskId) => ({
  type: PROGRESS_DISABLED_INPUT,
  isFetching,
  taskId,
});
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

/**********************************************************************************************************/

export const getTasksThunkCreator = () => (dispatch) => {
  todoAPI.getTasksAPI().then((tasks) => {
    dispatch(setTasksAC(tasks));
  });
};
export const putCompletedThunkCreator = (task) => {
  return (dispatch) => {
    dispatch(toggleProgressDisabledInputAC(true, task.id)); // disabled эл-нт пока не пришел ответ от сервера
    dispatch(toggleIsFetchingAC(true));
    todoAPI.putCompletedAPI(task).then((response) => {
      if (response.data.status === "success") {
        dispatch(toggleTaskInCompletedAC(task.id));
      }
      dispatch(toggleIsFetchingAC(false));
      dispatch(toggleProgressDisabledInputAC(false, task.id));
    });
  };
};

export const removeTaskThunkCreator = (id) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    todoAPI.removeTaskAPI(id).then((response) => {
      if (response.data.status === "success") {
        dispatch(deleteTaskAC(id));
      }
      dispatch(toggleIsFetchingAC(false));
    });
  };
};

export const onAddNewTaskThunkCreator = (newTaskText) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    todoAPI
      .addTaskAPI(newTaskText)
      .then((response) => {
        if (response.data.status === "success") {
        }
      })
      .then((response) => {
        todoAPI.getTasksAPI().then((tasks) => {
          // props.setTasks(tasks);
          dispatch(setTasksAC(tasks));
        });
        dispatch(toggleIsFetchingAC(false));
      });
  };
};

export default todoReducer;
