package pl.mazzaq.easyfit.workout.rest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WorkoutNotFoundException extends RuntimeException {

    private static final String msg = "Problem with reading workout from repository.";

    public WorkoutNotFoundException() {
        super(msg);
        log.error(msg);
    }
}
