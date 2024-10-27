package com.vdt.fosho.elasticsearch.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "items")
public class ItemDocument {

    @Id
    private Long id;

    @Field(name = "name")
    private String name;

    @Field(name = "price")
    private double price;

    @Field(name = "discount")
    private double discount;

    @Field(name = "unit")
    private String unit;

    @Field(name = "sold")
    private int sold;

    @Field(name = "stock")
    private int stock;

    @Field(name="rating")
    private double rating;

    @JsonProperty("thumbnail_url")
    @Field("thumbnail_url")
    private String thumbnailUrl;

}
