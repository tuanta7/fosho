package com.vdt.fosho.utils;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class TokenUtils {

    static final SecureRandom secureRandom = new SecureRandom();
    final Dotenv dotenv;

    @Value("${jwt.expiration}")
    long jwtExpiration;

    public static String generateRandomString(int length){
        byte[] randomBytes = new byte[(length + 3) / 4 * 3];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    public String generateAccessToken(UserDetails userDetails) {
        return buildToken(userDetails, new HashMap<>(), jwtExpiration);
    }

    private String buildToken(UserDetails userDetails, Map<String, Object> extraClaims, long expiration) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .claims(extraClaims)
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(dotenv.get("JWT_SECRET"));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims getClaims(String jwt) {
        return Jwts.parser()
                .verifyWith(getSigningKey()).build()
                .parseSignedClaims(jwt).getPayload();
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        final String email = extractEmail(jwt);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(jwt);
    }

    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(jwt);
        return claimsResolver.apply(claims);
    }

    public String extractEmail(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    private Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }

    private boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }
}
