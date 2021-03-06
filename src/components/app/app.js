
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
        ],
        term: '',
        filter: 'active'
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


    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            
            case 'active':
                return items.filter((item) => !item.done);

            case 'done':
                return items.filter((item) => item.done);

            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({ filter });
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

    onSearchChange = (term) => {
        this.setState({ term });
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });

    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    todos={visibleItems}
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