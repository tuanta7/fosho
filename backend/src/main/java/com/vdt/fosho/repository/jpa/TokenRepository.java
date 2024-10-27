package com.vdt.fosho.repository.jpa;

import com.vdt.fosho.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    @Query("SELECT t FROM Token t WHERE t.user.id = ?1 AND t.expired = false AND t.revoked = false")
    List<Token> findAllValidRefreshTokensByUserId(Long userId);

    Optional<Token> findByToken(String token);
}
