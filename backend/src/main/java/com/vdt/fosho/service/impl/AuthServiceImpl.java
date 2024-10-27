package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.request.LoginRequestDTO;
import com.vdt.fosho.dto.request.RegisterRequestDTO;
import com.vdt.fosho.entity.Token;
import com.vdt.fosho.entity.type.TokenType;
import com.vdt.fosho.repository.jpa.TokenRepository;
import com.vdt.fosho.entity.type.Role;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.repository.jpa.UserRepository;
import com.vdt.fosho.service.AuthService;
import com.vdt.fosho.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;


@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public User register(RegisterRequestDTO registerInput) {
        if (userRepository.existsByEmail(registerInput.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = User.builder()
                .fullName(registerInput.getFullName())
                .email(registerInput.getEmail())
                .password(passwordEncoder.encode(registerInput.getPassword()))
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }

    public User login(LoginRequestDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
        ));
        return userRepository
                .findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    @Transactional
    public String generateRefreshToken(User user) {
        String token = TokenUtils.generateRandomString(128);
        System.out.println("Token: " + token.length());
        revokeAllRefreshTokens(user);
        tokenRepository.save(Token.builder()
                .token(token)
                .user(user)
                .expiresAt(LocalDateTime.now().plusDays(90))
                .type(TokenType.OPAQUE)
                .build());
        return token;
    }

    private void revokeAllRefreshTokens(User user) {
        List<Token> validTokens = tokenRepository.findAllValidRefreshTokensByUserId(user.getId());
        if (validTokens.isEmpty()) return;

        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }
}
