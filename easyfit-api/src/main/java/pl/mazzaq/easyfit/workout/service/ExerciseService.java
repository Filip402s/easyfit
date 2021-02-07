package pl.mazzaq.easyfit.workout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.repository.ExerciseRepository;
import pl.mazzaq.easyfit.workout.repository.entities.Exercise;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
        List<Exercise> exercises = exerciseRepository.findAll();
        if (exercises.isEmpty()) {
            bootstrapExercises();
        }
    }

    public Exercise getById(int exerciseId) {
        return exerciseRepository.getOne(exerciseId);
    }

    public List<Exercise> getAll() {
        List<Exercise> exercises = exerciseRepository.findAll();
        return exercises.stream()
                .sorted(Comparator.comparing(Exercise::getName))
                .collect(Collectors.toList());
    }

    private void bootstrapExercises() {
        Set<Exercise> exercises = new HashSet<>();
//        exercises.add(new Exercise(1, "Deadlift"));
        exercises.add(new Exercise("Bench press"));
        exercises.add(new Exercise("Pullups"));
//        exercises.add(new Exercise(4, "Rows"));
//        exercises.add(new Exercise(5, "Squats"));
//        exercises.add(new Exercise(6, "Overhead press"));
//        exercises.add(new Exercise(7, "Bicep curl"));
//        exercises.add(new Exercise(8, "Lat raise"));
//        exercises.add(new Exercise(9, "Skullcrushers"));
        exercises.add(new Exercise("Bar Dips"));
        exercises.add(new Exercise("Dips"));
        exercises.add(new Exercise("Ab crunches"));
        exercises.add(new Exercise("Pushups"));
        exercises.add(new Exercise("Inverted rows"));
        exercises.add(new Exercise("Leg raises"));
        this.exerciseRepository.saveAll(exercises);
    }
}
