package com.vdt.fosho.service.impl;

import com.vdt.fosho.dto.response.UserResponseDTO;
import com.vdt.fosho.entity.User;
import com.vdt.fosho.repository.jpa.UserRepository;
import com.vdt.fosho.service.UserService;
import com.vdt.fosho.utils.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public User findByEmail(String userEmail) {
        return userRepository.findByEmail(userEmail)
               .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
    }

    public User findByRefreshToken(String token) {
        return userRepository.findByRefreshToken(token)
               .orElseThrow(() -> new ResourceNotFoundException("User not found with refresh token: " + token));
    }

    public UserResponseDTO toResponseDTO(User user) {
        return  UserResponseDTO.builder()
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .avatarUrl(user.getAvatarUrl())
                        .build();
    }
}
