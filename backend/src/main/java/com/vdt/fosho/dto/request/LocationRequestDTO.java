package com.vdt.fosho.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Range;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class LocationRequestDTO {
    @NotBlank(message = "Address is required")
    String address;

    @Range(min = -90, max = 90, message = "Latitude must be between -90 and 90")
    double latitude;

    @Range(min = -180, max = 180, message = "Longitude must be between -180 and 180")
    double longitude;
}

// 🤓 coordinates are always written with latitude firs