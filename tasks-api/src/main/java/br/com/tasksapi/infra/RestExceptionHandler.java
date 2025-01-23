package br.com.tasksapi.infra;

import br.com.tasksapi.exceptions.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<RestExceptionMessage> taskNotFoundException(TaskNotFoundException ex) {
        return new ResponseEntity<>(new RestExceptionMessage(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<RestExceptionMessage> runtimeException(RuntimeException ex) {
        return new ResponseEntity<>(new RestExceptionMessage("Ocorreu um erro interno do servidor. Tente novamente mais tarde"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
