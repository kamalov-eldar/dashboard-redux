import taskReducer from "./task-reducer";

let store = {
  _state: {
    tasks: [
      { done: false, id: "8278e35a-d006-42d8-8ab7-27fe8591ce4c", title: "Зададча 1 ", description: null },
      { done: false, id: "fc8a623d-bee2-4cdb-b466-951cbd425e6d", title: "Зададча 2", description: null },
      { done: false, id: "48e8dd30-eb01-4eec-91de-aac45de27027", title: "Зададча 3", description: null },
    ],
    newTaskText: "it-kamasutra.com",
  },
  // _callSubscriber вызвать подписчика
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer; // observer
  },

  dispatch(action) {
    this._state = taskReducer(this._state, action); // отдаем state и получаем изм state
    this._callSubscriber(this._state);
  },
};

//export default store;
//window.store = store;
