import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Form: React.FC = () => {
  const { addTask, editTask, state } = useTaskContext();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!task) return;

    if (isEditing && currentTaskIndex !== null) {
      editTask(currentTaskIndex, { task, description });
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      addTask({ task, description });
    }
    setTask('');
    setDescription('');
  };

  const handleEditInit = (index: number) => {
    setTask(state.todoList[index].task);
    setDescription(state.todoList[index].description);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicionar tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adicionar descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{isEditing ? 'Confirmar Edição' : 'Adicionar'}</button>
    </form>
  );
};

export default Form;
