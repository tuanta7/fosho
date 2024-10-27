package com.vdt.fosho.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@AllArgsConstructor
public class RestaurantResponseDTO {

    Long id;
    String name;
    String phone;

    @JsonProperty("open_time")
    String openTime;

    @JsonProperty("close_time")
    String closeTime;

    @JsonProperty("is_active")
    boolean isActive;

    @JsonProperty("logo_url")
    String logoUrl;

    @JsonProperty("logo_public_id")
    String logoPublicId;

    LocationResponseDTO location;

    Long ownerId;
}
