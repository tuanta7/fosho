package com.vdt.fosho.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "shipping_locations")
public class ShippingLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "recipient_phone", nullable = false)
    String recipientPhone;

    @Column(name = "recipient_name", nullable = false)
    String recipientName;

    @Column(name = "is_default")
    boolean isDefault;

    @Column(name = "address", nullable = false)
    String address;

    @Column(name = "coordinates", columnDefinition = "Point", nullable = false)
    Point coordinates;

    @Column(name = "deleted_at", columnDefinition = "TIMESTAMP")
    LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
