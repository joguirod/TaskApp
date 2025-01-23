package br.com.tasksapi.dtos;

import java.time.LocalDateTime;

public record TaskRequestDTO (
        String title,
        String description,
        LocalDateTime dueDate,
        LocalDateTime startDate
){
}
