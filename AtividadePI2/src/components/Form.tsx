import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TaskContext, Task } from "../context/TaskContext";
import Lista from "./Lista";

const Form: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<{ title: string; description: string }>();
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        throw new Error("Form must be used within a TaskProvider");
    }

    const { addTask } = taskContext;

    const onSubmit = (data: { title: string; description: string }) => {
        addTask(new Task(data.title, data.description));
        reset(); // Limpa os campos após adicionar
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

            <Lista />
        </div>
    );
};

export default Form;
