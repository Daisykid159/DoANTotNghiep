package org.example.ims_backend.common;

public enum Active {
    ACTIVE(1),
    INACTIVE(0);
    private final int value;
    private Active(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static Active fromValue(int value) {
        for (Active active : Active.values()) {
            if (active.value == value) {
                return active;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }

}
