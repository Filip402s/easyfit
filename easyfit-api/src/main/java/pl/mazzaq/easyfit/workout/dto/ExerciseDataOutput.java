package pl.mazzaq.easyfit.workout.dto;

import lombok.Value;
import pl.mazzaq.easyfit.workout.repository.entities.ExerciseData;

import java.util.List;
import java.util.stream.Collectors;

@Value
public class ExerciseDataOutput {


    int exerciseId;
    String exerciseName;
    String weight;
    Integer reps;
    Integer position;
}
