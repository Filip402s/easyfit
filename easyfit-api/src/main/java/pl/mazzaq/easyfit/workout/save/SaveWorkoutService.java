package pl.mazzaq.easyfit.workout.save;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.save.model.Workout;
import pl.mazzaq.easyfit.workout.save.model.WorkoutInput;
import pl.mazzaq.easyfit.workout.save.repository.WorkoutRepository;

@Slf4j
@Service
public class SaveWorkoutService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public SaveWorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public Workout save(WorkoutInput input) {
        log.info("Saving workout {}", input);
        Workout workout = new Workout(input);
        return workoutRepository.save(workout);
    }
}
