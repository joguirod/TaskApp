import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const Lista: React.FC = () => {
  const { state, deleteTask, moveToDoing, moveToDone } = useTaskContext();

  return (
    <>
      <div className="todo-column">
        <h2>A Fazer</h2>
        <ul className="todo-list">
          {state.todoList.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.task}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
              <button onClick={() => moveToDoing(index)}>Mover para Fazendo</button>
              <button onClick={() => deleteTask(index)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="todo-column">
        <h2>Fazendo</h2>
        <ul className="todo-list">
          {state.doingList.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.task}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
              <button onClick={() => moveToDone(index)}>Mover para Concluído</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="todo-column">
        <h2>Concluído</h2>
        <ul className="todo-list">
          {state.doneList.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.task}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Lista;
