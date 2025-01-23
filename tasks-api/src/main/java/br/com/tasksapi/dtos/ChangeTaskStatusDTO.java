package br.com.tasksapi.dtos;

import java.time.LocalDateTime;

public record ChangeTaskStatusDTO (
        Long id,
        int taskStatusCode
){
}
