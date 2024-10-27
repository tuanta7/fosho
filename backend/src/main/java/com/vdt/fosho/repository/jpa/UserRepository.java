package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM Token t JOIN t.user u WHERE t.token = ?1 AND t.expired = false AND t.revoked = false")
    Optional<User> findByRefreshToken(String token);

    boolean existsByEmail(String email);
}
