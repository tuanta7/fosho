package com.vdt.fosho.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "line_items")
public class LineItem {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;

        @ManyToOne(fetch=FetchType.EAGER)
        @JoinColumn(name = "item_id", nullable = false)
        Item item;

        @Column(name = "quantity")
        int quantity;

        @Column(name = "note", columnDefinition = "TEXT")
        String note;

        @ManyToOne(fetch=FetchType.LAZY)
        @JoinColumn(name = "cart_id")
        Cart cart;

        @ManyToOne(fetch=FetchType.LAZY)
        @JoinColumn(name = "order_id")
        Order order; // if order is null, this item is in cart
}
