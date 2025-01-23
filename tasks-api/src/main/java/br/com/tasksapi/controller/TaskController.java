package br.com.tasksapi.controller;

import br.com.tasksapi.domain.entities.Task;
import br.com.tasksapi.dtos.ChangeTaskStatusDTO;
import br.com.tasksapi.dtos.TaskEditRequestDTO;
import br.com.tasksapi.dtos.TaskRequestDTO;
import br.com.tasksapi.exceptions.TaskNotFoundException;
import br.com.tasksapi.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        return new ResponseEntity<>(taskService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) throws TaskNotFoundException {
        return new ResponseEntity<>(taskService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/status/{taskStatusCode}")
    public ResponseEntity<List<Task>> getTaskStatus(@PathVariable int taskStatusCode) throws TaskNotFoundException {
        return new ResponseEntity<>(taskService.findByStatus(taskStatusCode), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskRequestDTO taskDTO) {
        return new ResponseEntity<>(taskService.createTask(taskDTO), HttpStatus.CREATED);
    }

    @PostMapping("/changeStatus")
    public ResponseEntity<Task> changeTaskStatus(@RequestBody ChangeTaskStatusDTO taskDTO) throws TaskNotFoundException {
        return new ResponseEntity<>(taskService.changeTaskStatus(taskDTO), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody TaskEditRequestDTO taskDTO) throws TaskNotFoundException {
        return new ResponseEntity<>(taskService.editTask(taskDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteTask(@PathVariable Long id) throws TaskNotFoundException {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
