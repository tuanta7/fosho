package com.vdt.fosho.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "price")
    double price;

    @Column(name = "discount")
    double discount;

    @Column(name = "rating")
    double rating;

    @Column(name="unit")
    String unit;

    @Column(name = "sold")
    int sold;

    @Column(name = "description", columnDefinition = "TEXT")
    String description;

    @Column(name = "thumbnail_url")
    String thumbnailUrl;

    @Column(name = "thumbnail_public_id")
    String thumbnailPublicId;

    @Column(name = "stock")
    int stock;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    List<ItemImage> images;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    List<Review> reviews;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    Restaurant restaurant;
}
