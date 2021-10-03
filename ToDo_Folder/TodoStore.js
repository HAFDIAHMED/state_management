import React from "react";
import { observable, action, computed, makeObservable } from "mobx";
import AsyncStorage from '@react-native-community/async-storage';


class TodoStore {

    @observable idForTodo = 3;

    @observable todos = [
        {
            id: 1,
            title: "Todo 1",
            completed: false
        },
        {
            id: 2,
            title: "Todo 2",
            completed: false
        },
    ];

    constructor() {
	    makeObservable(this)
    }

    @action getData = async () => {
        const value = await AsyncStorage.getItem('TODOS')
        if (value !== null) {
	        this.todos = JSON.parse(value)
        }
    }

    @action addTodo = async (todoInput) => {
        this.todos.push({
            id: this.idForTodo,
            title: todoInput.trim(),
            completed: false
        });
        await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos))
        this.idForTodo++;
    };

    @action deleteTodo = async (id) => {
        const index = this.todos.findIndex((item) => item.id === id);
        this.todos.splice(index, 1);
        await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos))
    };

    @action checkTodo = async (todo) => {
        todo.completed = !todo.completed;
        const index = this.todos.findIndex((item) => item.id === todo.id);
        this.todos.splice(index, 1, todo);
        await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos))
    };

    @action checkAllTodos = async (value = true) => {
        this.todos.forEach((todo) => (todo.completed = value));
        await AsyncStorage.setItem('TODOS', JSON.stringify(this.todos))
    };

    @computed get todosCompletedCount() {
        return this.todos.filter((todo) => todo.completed).length;
    }

    @computed get remaining() {
        return this.todos.filter((todo) => !todo.completed).length;
    }

}

const store = new TodoStore();
export default store;