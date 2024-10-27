package com.vdt.fosho.entity;

import com.vdt.fosho.entity.type.PaymentMethod;
import jakarta.persistence.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", columnDefinition = "ENUM('COD', 'VNPAY_GATEWAY') default 'COD'")
    PaymentMethod paymentMethod;

    @Column(name = "transaction_id")
    String transactionId;

    @Column(name = "status")
    String status;
}
