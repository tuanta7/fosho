package com.vdt.fosho.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message", columnDefinition = "VARCHAR(1000)")
    private String message;

    @Column(name = "timestamp", columnDefinition = "DATETIME DEFAULT NOW()")
    private LocalDateTime timestamp;

    @Column(name = "from_user")
    private boolean fromUser;

    @Column(name = "seen", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean seen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

}
