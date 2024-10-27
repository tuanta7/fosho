package com.vdt.fosho.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserResponseDTO {

    Long id;

    @JsonProperty("full_name")
    String fullName;

    @JsonProperty("email")
    String email;

    @JsonProperty(value="avatar_url")
    String avatarUrl;
}
