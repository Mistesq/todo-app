
import React, { Component } from 'react';
import TodoList from '../todo-list/todo-list';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import "./app.scss";

class App extends Component {
  state = {
    todoData: [
        {
            label: 'Drink Coffee',
            important: false,
            id: 1
        },
        {
            label: 'Create React App',
            important: true,
            id: 2
        },
        {
            label: 'Chill',
            important: false,
            id: 3
        }
    ]
  };

  deleteItem = (id)  => {
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

  render() { 
        return (
            <div className="todo-app">
            <AppHeader toDo={1} done={3} />
            <div className="top-panel d-flex">
                <SearchPanel />
                <ItemStatusFilter />
            </div>

            <TodoList todos={this.state.todoData} onDeleted={ this.deleteItem }/>
            </div>
        );
    }
}

export default App;