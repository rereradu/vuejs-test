import { axiosInstance } from "@/axios.config";
import Todo from "@/models/todo";

class TodoApi {
    public async getTodos(): Promise<Todo[]> {
        const response = await axiosInstance.get<Todo[]>('todos');
        // limiting to 10 items for this excercise
        return response.data.splice(0, 10);
    }

    public async addTodo(title: string): Promise<Todo> {
        const todo = {
            title: title,
            userId: 1,
            completed: false
        };
        const response = await axiosInstance.post(`todos`, todo);
        return response.data;
    }

    public async updateTodo(todo: Todo) {
        const response = await axiosInstance.put(`todos/${todo.id}`, todo);
        return response.data;
    }

    public async deleteTodo(todo: Todo) {
        const response = await axiosInstance.delete(`todos/${todo.id}`);
        return response.data;
    }
}

const todoApi = new TodoApi();

export default todoApi;