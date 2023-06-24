import axios from 'axios';
import { TaskType } from '../../types/types';

const instance = axios.create({
    //baseURL: 'https://repetitora.net/api/js/',
    baseURL: 'https://repetitora.net/api/js/',
});

type ResGetType = Array<TaskType>;
type ResStatusType = {
    status: string;
};
type ResPostType = {
    status: string;
    task: TaskType;
};

export const todoAPI = {
    async getTasksAPI() {
        const response = await instance.get<ResGetType>('tasks?widgetid=987654');
        return response.data;
    },
    // методы get post put delete и др являются genericami
    addTaskAPI(newTaskText: string) {
        const response = instance.post<ResPostType>(`tasks?widgetid=987654&title=${newTaskText}`);
        return response;
    },
    putCompletedAPI(task: TaskType) {
        const response = instance.put<ResStatusType>(`tasks?widgetid=987654&taskId=${task.id}&done=${!task.done}`);
        return response;
    },

    removeTaskAPI(id: string) {
        const response = instance.delete<ResStatusType>(`tasks?widgetid=987654&taskId=${id}`);
        return response;
    },
};


/* task:
"done": false,
"id": "083fa6b8-bd38-4ebf-9e1c-a76111f5e8ef",
"title": "1",
"description": null
*/
