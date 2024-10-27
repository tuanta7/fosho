package com.vdt.fosho.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import com.vdt.fosho.entity.type.PaymentMethod;

import java.util.List;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderRequestDTO {

    @JsonProperty("restaurant_id")
    @NotNull(message = "Restaurant ID is required")
    long restaurantID;

    @JsonProperty("line_item_ids")
    @Size(min = 1, message = "Line item list can not be empty")
    List<Long> lineItemIDs;

    @JsonProperty("shipping_location_id")
    @NotNull(message = "Shipping location ID is required")
    long shippingLocationId;

    @JsonProperty("payment_method")
    PaymentMethod paymentMethod;

    @JsonProperty("discount_code")
    String discountCode;
}


