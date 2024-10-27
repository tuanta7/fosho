package com.vdt.fosho.utils.validators;


import com.vdt.fosho.utils.validators.annotations.StringMatchConstraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StringMatchValidator implements ConstraintValidator<StringMatchConstraint, String> {

    private String referenceField;

    @Override
    public void initialize(StringMatchConstraint constraintAnnotation) {
        this.referenceField = constraintAnnotation.referenceField();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return true;
    }
}
