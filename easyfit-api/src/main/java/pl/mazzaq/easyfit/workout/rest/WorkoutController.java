package pl.mazzaq.easyfit.workout.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.service.WorkoutCrudService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;

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
    public WorkoutOutput getWorkout(@PathVariable Integer id) {
        log.info("getting workout with id {}", id);

        WorkoutOutput workout = workoutService.read(id);
        log.info("successfully read workout: {}", workout.toString());

        return workout;
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

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
