package org.example.ims_backend.common;

public enum Role {
    DELIVERER(0),
    PRESIDE(1),
    COORDINATOR(2),
    FOLLOWER(3);
    private final int value;
    private Role(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static Role fromValue(int value) {
        for (Role role : Role.values()) {
            if (role.value == value) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }

}
