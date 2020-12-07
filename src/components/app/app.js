import React from 'react';
import TodoList from '../todo-list/todo-list';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import "./app.scss";

const App = () => {
  const todoData = [
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
  ];

  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} />
    </div>
  );
};

export default App;