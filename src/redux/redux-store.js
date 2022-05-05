import { applyMiddleware, combineReducers, compose } from "redux";
import { createStore } from "redux";
import todoReducer from "./todo-reducer";
//import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

//создаем обьект и собираем все редюсеры как св-ва обьекта
let reducers = combineReducers({
  todo: todoReducer, //
});

<<<<<<< HEAD
let store = createStore(reducers, compose(applyMiddleware(thunk)));
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
=======
let store = createStore(
  reducers,
  compose(applyMiddleware(thunk)),
);
>>>>>>> ee2ec249a0ada794310210d6663d90e4cb308df1
window.store = store;

export default store;
