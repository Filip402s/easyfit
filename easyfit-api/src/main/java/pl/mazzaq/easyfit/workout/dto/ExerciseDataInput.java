package pl.mazzaq.easyfit.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDataInput {

    int exerciseId;
    String exerciseName;
    String weight;
    int reps;
    int position;
}