package com.vdt.fosho.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RestaurantRequestDTO {

    @NotBlank(message = "Name is required")
    String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^(\\+84|0)\\d{9,10}$", message = "Invalid phone number")
    private String phone;

    @JsonProperty("open_time")
    @NotBlank(message = "Open time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid time format")
    String openTime;

    @JsonProperty("close_time")
    @NotBlank(message = "Close time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Invalid time format")
    String closeTime;

    @JsonProperty("location")
    LocationRequestDTO location;
}
