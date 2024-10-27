package com.vdt.fosho.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Range;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ItemRequestDTO {

    @NotBlank(message = "Name is required")
    String name;

    String description;

    @NotBlank(message = "Price is required")
    double price;

    @Range(min = 0, message = "Discount must be greater than or equal to 0")
    double discount;

    @NotBlank(message = "Unit is required")
    String unit;

    @JsonProperty("thumbnail_url")
    String thumbnailUrl;

    @Range(min = 0, message = "Stock must be greater than or equal to 0")
    int stock;
}
