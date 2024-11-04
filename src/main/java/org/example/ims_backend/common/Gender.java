package org.example.ims_backend.common;

public enum Gender {
    MALE(0),
    FEMALE(1);
    private final int value;

    private Gender(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static Gender fromValue(int value) {
        for(Gender gender : Gender.values()) {
            if (gender.value == value) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }

}
