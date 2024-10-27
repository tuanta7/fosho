package com.vdt.fosho.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Map;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JSendResponse {
    String status;
    String message;
    Object data;

    public static <T> JSendResponse success(Map<String, T> data) {
        return new JSendResponse("success",null, data);
    }

    public static <T> JSendResponse fail (T data) {
        return new JSendResponse("fail",null, data);
    }

    public static JSendResponse error(String message) {
        return new JSendResponse("error", message, null);
    }
}
