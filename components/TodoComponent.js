"use strict";
import KWM_Component from '../core/kwm-component.js';
import KWM_Computed from '../core/kwm-computed.js';
import KWM_Observable from '../core/kwm-observable.js';
import { todoModelInstance } from '../models/TodoModel.js';

export default class TodoComponent extends KWM_Component {
    constructor() {
        super();

        this.todos = todoModelInstance.todos;
        this.newTodoText = new KWM_Observable('');

        this.openTodos = new KWM_Computed(() => {
            return this.todos.value.filter(todo => !todo.completed);
        }, [this.todos]);

        this.todos.subscribe(() => this.render());
    }

    addTodo() {
        if (this.newTodoText.value.trim() !== '') {
            todoModelInstance.addTodo(this.newTodoText.value);
        }
        this.newTodoText.value = '';
    }

    removeTodo(todoId) {
        todoModelInstance.removeTodo(todoId);
    }

    toggleTodo(todoId) {
        todoModelInstance.toggleTodo(todoId);
    }

    template() {
        return `
            <div>
                <h2>Todo List</h2>
                <input kwm-model-value="this.newTodoText" />
                <button kwm-listen-click="this.addTodo()">Add Todo</button>

                <h3>Open Todos</h3>
                <ul>
                    ${this.openTodos.value.map(todo => `
                        <li>
                            <input kwm-listen-click="this.toggleTodo(${todo.id})" type="checkbox" ${todo.completed ? 'checked' : '' } />
                            <span>${todo.text}</span>
                            <button kwm-listen-click="this.removeTodo(${todo.id})">Remove</button>
                        </li>
                    `).join('')}
                </ul>

            </div>
        `;
    }
}

customElements.define('todo-component', TodoComponent);
