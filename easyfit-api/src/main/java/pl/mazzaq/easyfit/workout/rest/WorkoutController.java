package pl.mazzaq.easyfit.workout.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.service.WorkoutCrudService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.*;

@Slf4j
@RequestMapping("/workout")
@RestController
public class WorkoutController {

    private final WorkoutCrudService workoutService;

    @Autowired
    public WorkoutController(WorkoutCrudService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping("/{id}")
    public WorkoutOutput getWorkoutById(@PathVariable Integer id) {
        log.info("getting workout with id {}", id);

        WorkoutOutput workout = workoutService.readById(id);
        log.info("successfully read workout: {}", workout.toString());

        return workout;
    }
    @GetMapping
    public List<WorkoutOutput> getWorkoutHistory() {
        log.info("getting workout history");

        Collection<WorkoutOutput> workoutHistory = workoutService.readAll();
        log.info("successfully read workout: {}", workoutHistory.toString());

        return new ArrayList<>(workoutHistory);
    }

    @PostMapping
    public WorkoutOutput finishWorkout(@RequestBody @Valid WorkoutInput workout) {
//        log.info("user {} is saving workout with data {}", userId, workout.toString());
        log.info("saving workout with data: {}", workout.toString());

        WorkoutOutput workoutOutput = workoutService.create(workout);
        log.info("successfully saved workout with data: {}", workoutOutput.toString());
        return workoutOutput;
    }

    @DeleteMapping("/{workoutId}")
    public boolean deleteWorkout(@PathVariable @NotNull Integer workoutId) {
        log.info("deleting workout with id: {}", workoutId);

        boolean result = workoutService.delete(workoutId);
        log.info("Deleting workout result: {}", result);
        return result;
    }
}
