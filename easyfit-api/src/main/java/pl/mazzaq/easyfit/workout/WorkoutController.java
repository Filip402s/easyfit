package pl.mazzaq.easyfit.workout;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.mazzaq.easyfit.workout.save.SaveWorkoutService;
import pl.mazzaq.easyfit.workout.save.model.Workout;
import pl.mazzaq.easyfit.workout.save.model.WorkoutInput;

@Slf4j
@RestController
public class WorkoutController {

    private final SaveWorkoutService saveWorkoutService;

    @Autowired
    public WorkoutController(SaveWorkoutService saveWorkoutService) {
        this.saveWorkoutService = saveWorkoutService;
    }

    @GetMapping
    public String getHello() {
        log.info("HELLO TEST");
        return "Hello";
    }

    @PostMapping("/workout")
    public Workout saveWorkout(@RequestBody WorkoutInput workout) {
//        log.info("user {} is saving workout with data {}", userId, workout.toString());
        log.info("saving workout with data: {}", workout.toString());

        Workout workoutOutput = saveWorkoutService.save(workout);
        log.info("successfully saved workout with data: {}", workoutOutput.toString());
        return workoutOutput;
    }
}
