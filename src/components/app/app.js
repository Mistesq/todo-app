
import React, { Component } from 'react';
import TodoList from '../todo-list/todo-list';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from './../item-add-form/item-add-form';

import "./app.scss";

class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Create React App'),
            this.createTodoItem('Chill')
        ]
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);

            const newData = [...before, ...after];

            return {
                todoData: newData
            };
        });
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        }

        this.setState(({ todoData }) => {
            return {
                todoData: [
                    ...todoData,
                    newItem
                ]
            }
        });
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        const before = arr.slice(0, idx);
        const after = arr.slice(idx + 1);

        return [...before, newItem, ...after];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            const newData = this.toggleProperty(todoData, id, 'important');

            return {
                todoData: newData
            };
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const newData = this.toggleProperty(todoData, id, 'done');

            return {
                todoData: newData
            };
        });
    }

    render() {
        
        const doneCount = this.state.todoData.filter((el) => el.done).length;
        const todoCount = this.state.todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
}

export default App;