package br.com.tasksapi.infra;

public class RestExceptionMessage {
    String message;

    public RestExceptionMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
