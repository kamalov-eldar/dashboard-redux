import { applyMiddleware, combineReducers, compose } from "redux";
import { createStore } from "redux";
import todoReducer from "./todo-reducer";
//import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";

//создаем обьект и собираем все редюсеры как св-ва обьекта
let reducers = combineReducers({
  todo: todoReducer, //
});

let store = createStore(reducers, compose(applyMiddleware(thunk)));
window.store = store;

export default store;
