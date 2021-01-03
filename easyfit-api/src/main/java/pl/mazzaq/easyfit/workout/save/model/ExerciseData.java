package pl.mazzaq.easyfit.workout.save.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseData {

    int exerciseId;
    String exerciseName;
    String weight;
    int reps;
    int position;
}