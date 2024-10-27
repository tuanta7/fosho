package com.vdt.fosho.entity;

import com.vdt.fosho.entity.type.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_email", columnList = "email")
})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "email")
    String email;

    @Column(name = "password")
    String password;

    @Column(name = "full_name")
    String fullName;

    @Column(name = "avatar_url")
    String avatarUrl;

    @Column(name = "avatar_public_id")
    String avatarPublicId;

    @OneToMany(mappedBy = "user")
    List<ShippingLocation> shippingLocations;

    @OneToMany(mappedBy = "owner")
    List<Restaurant> restaurants;

    // Spring Security
    Role role;

    @OneToMany(mappedBy = "user")
    List<Token> tokens;

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
}
