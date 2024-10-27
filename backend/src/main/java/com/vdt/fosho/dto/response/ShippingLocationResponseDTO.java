package com.vdt.fosho.dto.response;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShippingLocationResponseDTO {

    Long id;

    String address;

    @JsonProperty("lat")
    double latitude;

    @JsonProperty("long")
    double longitude;

    @JsonProperty("recipient_name")
    String recipientName;

    @JsonProperty("recipient_phone")
    String recipientPhone;
}
