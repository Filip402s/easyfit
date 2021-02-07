package pl.mazzaq.easyfit.workout.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mazzaq.easyfit.workout.repository.entities.Exercise;
import pl.mazzaq.easyfit.workout.service.ExerciseService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequestMapping("/exercises")
@RestController
public class ExercisesController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExercisesController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getExercises() {
        log.info("getting exercises");

        List<Exercise> exercises = exerciseService.getAll();
        log.info("successfully read {} exercises: {}", exercises.size(), exercises.toString());

        return new ArrayList<>(exercises);
    }
}
