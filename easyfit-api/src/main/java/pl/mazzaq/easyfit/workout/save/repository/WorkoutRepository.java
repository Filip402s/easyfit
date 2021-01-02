package pl.mazzaq.easyfit.workout.save.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import pl.mazzaq.easyfit.workout.save.model.Workout;

@Slf4j
@Repository
public class WorkoutRepository { //todo replace with jpa

    public Workout save(Workout workout) {
        log.warn("save method not implemented yet");
        return workout;
    }
}
