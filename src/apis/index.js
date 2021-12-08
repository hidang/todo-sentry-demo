import axios from 'axios';

const baseURL = 'https://61af32753e2aba0017c490c7.mockapi.io';

export const api = {
  getTodoList: () => axios.get(`${baseURL}/todos`),

  getTodo: idTodo => axios.get(`${baseURL}/todos/${idTodo}`),

  updateTodo: todo => axios.put(`${baseURL}/todos/${todo.id}`, todo),

  deleteTodo: idTodo => axios.delete(`${baseURL}/todos/${idTodo}`),
};
