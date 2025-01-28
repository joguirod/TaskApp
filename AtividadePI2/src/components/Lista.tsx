import React, { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import axios from 'axios';

const Lista: React.FC = () => {
  const { state, deleteTask, moveToDoing, moveToDone, setTasks } = useTaskContext();

  useEffect(() => {
    axios.get('http://localhost:8080/api/task')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar as tarefas:', error);
      });
  }, [setTasks]);  

  const handleMoveToDoing = (index: number, taskId: number) => {
    axios.post('http://localhost:8080/api/task/changeStatus', { id: taskId, taskStatusCode: "1" })
      .then(response => {
        moveToDoing(index);
      })
      .catch(error => {
        console.error('Erro ao mover para Fazendo:', error);
      });
  };

  const handleMoveToDone = (index: number, taskId: number) => {
    axios.post('http://localhost:8080/api/task/changeStatus', { id: taskId, taskStatusCode: "2" })
      .then(response => {
        moveToDone(index);
      })
      .catch(error => {
        console.error('Erro ao mover para Concluído:', error);
      });
  };

  const handleDeleteTask = (index: number, taskId: number) => {
    axios.delete(`http://localhost:8080/api/task/${taskId}`)
      .then(response => {
        deleteTask(index);
      })
      .catch(error => {
        console.error('Erro ao deletar tarefa:', error);
      });
  };

  return (
    <>
      <div className="todo-column">
        <h2>A Fazer</h2>
        <ul className="todo-list">
          {state.todoList.map((item, index) => (
            <li key={index}>
              <div>
                <strong>{item.title}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
              {item.id !== undefined && (
                <>
                    <button onClick={() => handleMoveToDoing(index, item.id!)}>Mover para Fazendo</button>
                    <button onClick={() => handleDeleteTask(index, item.id!)}>Deletar</button>
                </>
                )}
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
                {item.id !== undefined && (
                  <button onClick={() => handleMoveToDone(index, item.id!)}>Mover para Concluído</button>
                )}
                <strong>{item.title}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
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
                <strong>{item.title}</strong>
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
