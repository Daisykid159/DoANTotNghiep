package org.example.ims_backend.common;

public enum State {
    NEWLY_CREATED(0),
    INFORMATION_RECEIVED(1),
    PROGRESS_REPORT(2),
    COMPLETED_REPORT_SENT(3);
    private final int value;
    private State(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static State fromValue(int value) {
        for (State state : State.values()) {
            if (state.value == value) {
                return state;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
