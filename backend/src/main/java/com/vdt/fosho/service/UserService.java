package com.vdt.fosho.service;

import com.vdt.fosho.entity.User;

public interface UserService {

    User findByEmail(String email);

    User findByRefreshToken(String token);
}
