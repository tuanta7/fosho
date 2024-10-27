package com.vdt.fosho.elasticsearch.document;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "orders")
public class OrderDocument {

    @Id
    private Long id;

    @Field(name = "restaurant_id")
    private Long restaurantId;

    @Field(name = "user_id")
    private Long userId;

    @Field(name = "total_price")
    private double totalPrice;

    @Field(name = "shipping_fee")
    private double shippingFee;

    @Field(name = "total_discount")
    private double totalDiscount;

    @Field(name = "status")
    private String status;

    @Field(name = "created_at")
    private Timestamp createdAt;

    @Field(name = "delivered_at")
    private Timestamp deliveredAt;
}
