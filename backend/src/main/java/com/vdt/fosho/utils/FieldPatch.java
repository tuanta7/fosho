package com.vdt.fosho.utils;


import org.springframework.beans.BeanUtils;

public final class FieldPatch {

    private FieldPatch() {
        throw new UnsupportedOperationException("Utility class");
    }

    // TODO: Implement patch method
    public static void applyPatch(Object source, Object target, String... ignoreProperties) {
        BeanUtils.copyProperties(source, target, ignoreProperties);
    }
}
