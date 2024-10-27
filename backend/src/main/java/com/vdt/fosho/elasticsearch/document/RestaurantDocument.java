package com.vdt.fosho.elasticsearch.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Document(indexName = "restaurants")
public class RestaurantDocument {

    @Id
    Long id;

    @Field(name = "name")
    String name;

    @Field(name = "address")
    String address;

    @JsonProperty("logo_url")
    @Field(name = "logo_url")
    String logoUrl;

    @JsonProperty("is_active")
    @Field(name = "is_active")
    boolean isActive;

    @Field(name = "open_time")
    @JsonProperty("open_time")
    private String openTime;

    @JsonProperty("close_time")
    @Field(name = "close_time")
    private String closeTime;

    @Field(name = "rating")
    private double rating;

    @Field(name = "phone")
    private String phone;

    @JsonProperty("lat")
    @Field(name = "latitude")
    private double latitude;

    @JsonProperty("long")
    @Field(name = "longitude")
    private double longitude;
}
