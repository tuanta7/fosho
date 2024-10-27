package com.vdt.fosho.controller;

import com.vdt.fosho.dto.response.UserResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.utils.JSendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/info")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public JSendResponse info() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            return JSendResponse.success(Map.of("user", toDTO(user)));
        }
        throw new IllegalArgumentException("User is not authenticated");
    }


    // Websocket for Notifications
    @MessageMapping("/user.connect")
    public String connectUser(@Payload String message) {
        System.out.println("User connected: " + message);
        return message;
    }

    @MessageMapping("/user.disconnect")
    public String disconnectUser(@Payload String message) {
        return message;
    }

    private UserResponseDTO toDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }
}
