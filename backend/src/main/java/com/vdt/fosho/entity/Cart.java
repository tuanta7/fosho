package com.vdt.fosho.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "session_id", unique = true)
    Long sessionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    // Each user has many carts, each cart contains items
    // that they want to purchase from a restaurant.
    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    Restaurant restaurant;

    @OneToMany(mappedBy = "cart")
    List<LineItem> items;
}
