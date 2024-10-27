package com.vdt.fosho.entity;

import com.vdt.fosho.entity.type.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    Restaurant restaurant;

    @OneToMany(mappedBy = "order")
    List<LineItem> items;

    @Column(name = "total_price")
    double totalPrice;

    @Column(name = "shipping_fee")
    double shippingFee;

    @Column(name = "total_discount")
    double totalDiscount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    OrderStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_location_id", nullable = false)
    ShippingLocation shippingLocation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "payment_id", nullable = false)
    Payment payment;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    User customer;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    User driver;

    // Timestamps
    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT NOW()")
    LocalDateTime createdAt;

    @Column(name = "confirmed_at", columnDefinition = "DATETIME")
    LocalDateTime confirmedAt;

    @Column(name = "pickup_at", columnDefinition = "DATETIME")
    LocalDateTime pickupAt;

    @Column(name = "delivered_at", columnDefinition = "DATETIME")
    LocalDateTime deliveredAt;
}
