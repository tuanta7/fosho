package com.vdt.fosho.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.vdt.fosho.utils.validators.StringMatchValidator;
import com.vdt.fosho.utils.validators.annotations.StringMatchConstraint;
import jakarta.validation.Constraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RegisterRequestDTO {

    @NotBlank(message = "Full name is required")
    @JsonProperty("full_name")
    String fullName;

    @NotBlank(message = "Email is required")
    @Email
    String email;

    @NotBlank
    @Length(min = 8, message = "Password must be at least 8 characters")
    String password;

    @JsonProperty("confirm_password")
    @StringMatchConstraint(referenceField = "password", message = "Confirm password do not match")
    String confirmPassword;
}
