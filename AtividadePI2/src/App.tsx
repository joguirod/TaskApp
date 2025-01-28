import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Form from './components/Form';
import Lista from './components/Lista';

function App() {
  return (
    <TaskProvider>
      <div className="todo-wrapper">
        <h1>Para Fazer (Cópia do Trello)</h1>
        <Form />
        <div className="todo-columns">
          <Lista />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
