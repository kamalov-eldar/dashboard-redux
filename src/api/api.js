import axios from "axios";

export const todoAPI = {
  async getTasksAPI() {
    const response = await axios.get("https://repetitora.net/api/js/tasks?widgetid=987654");
    return response.data;
  },
  // добавление задачи
  addTaskAPI(taskText) {
   // console.log("taskText-addTaskAPI: ", taskText);

    return axios.post(`https://repetitora.net/api/js/tasks`, { widgetid: 987654, title: taskText });
  },
  putCompletedAPI(task) {
    return axios.put(`https://repetitora.net/api/js/tasks?widgetid=987654&taskId=${task.id}&done=${!task.done}`);
  },
  // удаление задачи
  removeTaskAPI(id) {
    return axios.delete(`https://repetitora.net/api/js/Tasks?widgetid=987654&taskId=${id}`);
  },
};

