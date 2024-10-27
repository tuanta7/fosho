package com.vdt.fosho.utils.validators.annotations;

import com.vdt.fosho.utils.validators.StringMatchValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StringMatchValidator.class)
public @interface StringMatchConstraint {

    String message() default "Fields values must match";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String referenceField();
}
