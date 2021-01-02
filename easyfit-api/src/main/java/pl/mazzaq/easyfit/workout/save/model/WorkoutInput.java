package pl.mazzaq.easyfit.workout.save.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class WorkoutInput {

    List<ExerciseData> exercises;
}
