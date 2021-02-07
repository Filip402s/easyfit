package pl.mazzaq.easyfit.workout.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.repository.entities.ExerciseData;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;
import pl.mazzaq.easyfit.workout.service.ExerciseService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutConverter {

    private final ExerciseService exerciseService;

    @Autowired
    public WorkoutConverter(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    public WorkoutOutput convert(Workout workout) {
        return of(workout);
    }

    private static WorkoutOutput of(Workout workout) {
        return new WorkoutOutput(
                workout.getId(),
                workout.getStartTime().toLocalDateTime().toString(),
                workout.getDuration(),
                of(workout.getExercises()));
    }

    public List<ExerciseData> convert(List<ExerciseDataInput> exercises, Workout workout) {
        return exercises.stream()
                .map(input -> new ExerciseData(exerciseService.getById(input.getExerciseId()),
                        input.getWeight(), input.getReps(), input.getPosition(), workout))
                .collect(Collectors.toList());
    }

    private static List<ExerciseDataOutput> of(List<ExerciseData> exercises) {
        return exercises.stream()
                .map(WorkoutConverter::getExerciseDataOutput)
                .collect(Collectors.toList());
    }

    private static ExerciseDataOutput getExerciseDataOutput(ExerciseData exercise) {
        return new ExerciseDataOutput(exercise.getId(), exercise.getExercise().getName(), exercise.getWeight(),
                exercise.getReps(), exercise.getPosition());
    }
}
