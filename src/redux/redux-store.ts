import { Action, applyMiddleware, combineReducers, compose } from 'redux';
import { createStore } from 'redux';
import todoReducer from './todo-reducer';
import  ThunkMiddleware from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//создаем обьект и собираем все редюсеры как св-ва обьекта
const rootReducer = combineReducers({
  todo: todoReducer,

});

type RootReducerType = typeof rootReducer;

export type AppSateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R=void> = ThunkAction<R, AppSateType, unknown, A>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ThunkMiddleware)));

export default store;
