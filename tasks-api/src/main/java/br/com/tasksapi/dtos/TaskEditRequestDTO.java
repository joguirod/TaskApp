package br.com.tasksapi.dtos;

import br.com.tasksapi.domain.entities.TaskStatus;

import java.time.LocalDateTime;

public record TaskEditRequestDTO (
        Long id,
        String title,
        String description,
        LocalDateTime dueDate,
        LocalDateTime startDate,
        int taskStatusCode
){
}
