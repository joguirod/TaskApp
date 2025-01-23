package br.com.tasksapi.services;

import br.com.tasksapi.domain.entities.Task;
import br.com.tasksapi.domain.entities.TaskStatus;
import br.com.tasksapi.dtos.ChangeTaskStatusDTO;
import br.com.tasksapi.dtos.TaskEditRequestDTO;
import br.com.tasksapi.dtos.TaskRequestDTO;
import br.com.tasksapi.exceptions.TaskNotFoundException;
import br.com.tasksapi.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }

    public Task findById(Long id) throws TaskNotFoundException {
        Optional<Task> task = this.taskRepository.findById(id);

        if (task.isEmpty()) {
            throw new TaskNotFoundException("Tarefa com o id informado não encontrado");
        }

        return task.get();
    }

    public List<Task> findByStatus(int statusCode) throws TaskNotFoundException {
        TaskStatus taskStatus = TaskStatus.values()[statusCode];
        this.taskRepository.findByTaskStatus(taskStatus);
        return this.taskRepository.findByTaskStatus(taskStatus);
    }

    public Task createTask(TaskRequestDTO taskDTO) {
        Task task = new Task();

        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setDueDate(taskDTO.dueDate());
        task.setStartDate(taskDTO.startDate());
        task.setTaskStatus(TaskStatus.TODO);

        return taskRepository.save(task);
    }

    public Task editTask(TaskEditRequestDTO taskDTO) throws TaskNotFoundException {
        Task task = this.findById(taskDTO.id());

        task.setTitle(taskDTO.title());
        task.setDescription(taskDTO.description());
        task.setDueDate(taskDTO.dueDate());
        task.setStartDate(taskDTO.startDate());
        task.setTaskStatus(TaskStatus.values()[taskDTO.taskStatusCode()]);

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) throws TaskNotFoundException {
        Task task = this.findById(id);
        this.taskRepository.delete(task);
    }

    public Task changeTaskStatus(ChangeTaskStatusDTO changeTaskStatusDTO) throws TaskNotFoundException {
        Task task = this.findById(changeTaskStatusDTO.id());

        task.setTaskStatus(TaskStatus.values()[changeTaskStatusDTO.taskStatusCode()]);

        return taskRepository.save(task);
    }
}
