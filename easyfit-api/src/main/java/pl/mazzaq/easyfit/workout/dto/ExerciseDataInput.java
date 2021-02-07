package pl.mazzaq.easyfit.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mazzaq.easyfit.workout.dto.validation.ExerciseExistsConstraint;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ExerciseExistsConstraint
public class ExerciseDataInput {

    Integer exerciseId;

    String exerciseName;

    String weight;

    @Min(value = 0)
    Integer reps;

    @NotNull
    Integer position;
}