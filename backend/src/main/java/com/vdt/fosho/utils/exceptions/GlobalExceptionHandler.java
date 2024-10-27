package com.vdt.fosho.utils.exceptions;

import com.vdt.fosho.utils.JSendResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.sql.SQLException;
import java.util.HashMap;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public JSendResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        HashMap<String, String> messages = new HashMap<>();
        for (int i = 0; i < e.getAllErrors().size(); i++) {
            FieldError error  =e.getFieldErrors().get(i);
            messages.put(error.getField(), error.getDefaultMessage());
        }
        return JSendResponse.fail(messages);
    }


    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public JSendResponse handleBadRequestException(BadRequestException e) {
        return JSendResponse.error(e.getMessage());
    }


    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public JSendResponse handleResourceNotFoundException(ResourceNotFoundException e) {
        return JSendResponse.error(e.getMessage());
    }


    // TODO: Handle SQL exceptions
    @ExceptionHandler(SQLException.class)
    public JSendResponse handleSQLException(SQLException e) {
        return JSendResponse.error(e.getMessage());
    }


    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public JSendResponse handleAuthenticationException(AuthenticationException e) {
        return JSendResponse.error(e.getMessage());
    }


    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public JSendResponse handleForbiddenException(ForbiddenException e) {
        return JSendResponse.error(e.getMessage());
    }


    @ExceptionHandler(MaxUploadSizeExceededException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public JSendResponse handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        return JSendResponse.error("File size too large. Please upload a file smaller than 10MB.");
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public JSendResponse handleException(Exception e) {
        try {
            return JSendResponse.error(e.getMessage());
        } catch(Exception ex) {
            return JSendResponse.error("Something went wrong. Please try again later 🌠.");
        }
    }
}
