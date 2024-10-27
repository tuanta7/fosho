package com.vdt.fosho.dto.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Range;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShippingLocationRequestDTO {
    @NotBlank(message = "Address is required")
    private String address;

    @Range(min = -90, max = 90, message = "Invalid latitude")
    @JsonProperty("lat")
    private double latitude;

    @Range(min = -180, max = 180, message = "Invalid longitude")
    @JsonProperty("long")
    private double longitude;

    @JsonProperty("recipient_name")
    @NotBlank(message = "Recipient name is required")
    String recipientName;

    @JsonProperty("recipient_phone")
    @NotBlank(message = "Recipient phone is required")
    @Pattern(regexp = "^(\\+84|0)\\d{9,10}$", message = "Invalid phone number")
    String recipientPhone;
}
