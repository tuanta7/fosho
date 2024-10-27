package com.vdt.fosho.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartItemRequestDTO {

    @JsonProperty("item_id")
    Long itemId;

    @Min(value = 1, message = "Quantity should be at least 1")
    @JsonProperty("quantity")
    int quantity;

    @Length(max = 1000, message = "Note should be less than 1000 characters")
    @JsonProperty("note")
    String note;
}
