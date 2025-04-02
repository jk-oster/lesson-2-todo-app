

import KWM_Observable from "../core/kwm-observable.js";

export default class TodoModel {
    constructor() {
        this.todos = new KWM_Observable([]);
    }

    addTodo(todoText) {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        this.todos.value = [...this.todos.value, newTodo];
    }

    removeTodo(todoId) {
        this.todos.value = this.todos.value.filter(todo => todo.id !== todoId);
    }

    toggleTodo(todoId) {
        this.todos.value = this.todos.value.map(todo => {
            if (todo.id === todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
    }
}

export const todoModelInstance = new TodoModel();
