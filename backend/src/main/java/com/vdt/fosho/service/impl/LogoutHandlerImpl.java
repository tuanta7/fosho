package com.vdt.fosho.service.impl;

import com.vdt.fosho.entity.Token;
import com.vdt.fosho.repository.jpa.TokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LogoutHandlerImpl implements LogoutHandler {

    private final TokenRepository tokenRepository;

    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final Cookie[] cookies = request.getCookies();
        boolean hasRefreshToken = false;

        if (cookies == null) {
            response.setStatus(401);
            return;
        }

        for (Cookie c : cookies) {
            if (c.getName().equals("refresh_token")) {
                hasRefreshToken = true;
                Token refreshToken = tokenRepository.findByToken(c.getValue()).orElse(null);
                if (refreshToken != null) {
                    refreshToken.setRevoked(true);
                    refreshToken.setExpired(true);
                    tokenRepository.save(refreshToken);
                }
                c.setMaxAge(0);
                response.addCookie(c);
            }
        }

        if (!hasRefreshToken) {
            response.setStatus(401);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(401);
        }

        // Okta SSO practice: Once issued, access tokens and ID tokens cannot be revoked
        // As a result, tokens should be issued for relatively short periods, and then
        // refreshed periodically if the user remains active.
    }
}
