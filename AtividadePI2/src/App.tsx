import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [itemsList, setItemsList] = useState<{ task: string; description: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  function handleChangeTask(event: React.ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function adicionarNaLista(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!task) {
      return;
    }
    if (isEditing && currentTaskIndex !== null) {
      const updatedItemsList = [...itemsList];
      updatedItemsList[currentTaskIndex] = { task, description };
      setItemsList(updatedItemsList);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setItemsList([...itemsList, { task, description }]);
    }
    setTask('');
    setDescription('');
  }

  function editarTarefa(index: number) {
    setTask(itemsList[index].task);
    setDescription(itemsList[index].description);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  }

  function deletarTarefa(index: number) {
    const updatedItemsList = itemsList.filter((_, i) => i !== index);
    setItemsList(updatedItemsList);
  }

  return (
    <div className="todo-wrapper">
      <h1>Para Fazer (Cópia do Trello)</h1>
      <form onSubmit={adicionarNaLista}>
        <input
          type="text"
          placeholder="Adicionar tarefa"
          onChange={handleChangeTask}
          value={task}
        />
        <input
          type="text"
          placeholder="Adicionar descrição"
          onChange={handleChangeDescription}
          value={description}
        />
        <button type="submit">{isEditing ? 'Confirmar Edição' : 'Adicionar'}</button>
      </form>
      <ul className="todo-list">
        {itemsList.map((item, index) => (
          <li key={index}>
            <div>
              <strong>{item.task}</strong>
              {item.description && <p>{item.description}</p>}
            </div>
            <button onClick={() => editarTarefa(index)}>Editar</button>
            <button onClick={() => deletarTarefa(index)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
