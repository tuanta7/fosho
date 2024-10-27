package com.vdt.fosho.service;

import com.vdt.fosho.dto.request.LoginRequestDTO;
import com.vdt.fosho.dto.request.RegisterRequestDTO;
import com.vdt.fosho.entity.User;


public interface AuthService {

    User register(RegisterRequestDTO registerInput);

    User login(LoginRequestDTO loginDTO);

    String generateRefreshToken(User user);
}
