package com.vdt.fosho.controller;

import com.vdt.fosho.dto.request.LoginRequestDTO;
import com.vdt.fosho.dto.request.RegisterRequestDTO;
import com.vdt.fosho.dto.response.AuthResponseDTO;
import com.vdt.fosho.dto.response.UserResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.service.AuthService;
import com.vdt.fosho.service.UserService;
import com.vdt.fosho.utils.JSendResponse;
import com.vdt.fosho.utils.TokenUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RequiredArgsConstructor
@RestController
public class AuthController {

    private final LogoutHandler logoutHandler;
    private final AuthService authService;
    private final UserService userService;
    private final TokenUtils tokenUtils;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity<AuthResponseDTO> register(
            HttpServletResponse resp,
            @RequestBody @Valid RegisterRequestDTO registerDTO
    ) {
        User user = authService.register(registerDTO);
        return ResponseEntity.ok(buildResponse(resp, user));
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<AuthResponseDTO> login(
            HttpServletResponse resp,
            @RequestBody @Valid LoginRequestDTO credentials
    ) {
        User user = authService.login(credentials);
        return ResponseEntity.ok(buildResponse(resp, user));
    }

    @PostMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<AuthResponseDTO> refresh(
            HttpServletResponse resp,
            @CookieValue("refresh_token") String refreshToken
    ) {
        if (refreshToken == null) {
           throw new IllegalArgumentException("Refresh token is missing");
        }
        User user = userService.findByRefreshToken(refreshToken);
        return ResponseEntity.ok(buildResponse(resp, user));
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @ResponseBody
    public JSendResponse logout(
            HttpServletResponse response,
            HttpServletRequest request
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logoutHandler.logout(request, response, authentication);
        return JSendResponse.success(null);
    }

    private AuthResponseDTO buildResponse(HttpServletResponse resp, User user){
        String accessToken = tokenUtils.generateAccessToken(user);
        String refreshToken = authService.generateRefreshToken(user);

        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        resp.addCookie(cookie);

        return AuthResponseDTO.builder()
                .accessToken(accessToken)
                .user(UserResponseDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .avatarUrl(user.getAvatarUrl())
                        .build()
                ).build();
    }
}
