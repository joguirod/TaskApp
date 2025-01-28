import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext, Task } from "../context/TaskContext";
import axios from 'axios';

const Form: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<{ title: string; description: string }>();
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error("Form must be used within a TaskProvider");
    }

    const { addTask } = taskContext;

    const onSubmit = (data: { title: string; description: string }) => {
        const newTask = new Task(data.title, data.description);

        axios.post('http://localhost:8080/api/task', {
            title: newTask.title,
            description: newTask.description
        })
        .then(response => {
            addTask(response.data);
            reset();
        })
        .catch(error => {
            console.error('Erro ao adicionar tarefa:', error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Adicionar tarefa"
                    {...register("title", { required: true })}
                />
                <input
                    type="text"
                    placeholder="Adicionar descrição"
                    {...register("description")}
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default Form;
