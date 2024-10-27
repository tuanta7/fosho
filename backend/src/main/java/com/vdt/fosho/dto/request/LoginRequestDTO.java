package com.vdt.fosho.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginRequestDTO {

    @JsonProperty("email")
    @Email
    @NotBlank(message = "Email is required")
    String email;

    @JsonProperty("password")
    @NotBlank
    @Length(min = 8, message = "Password must be at least 8 characters")
    String password;
}
