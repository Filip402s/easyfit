package pl.mazzaq.easyfit.workout.save.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
@AllArgsConstructor
public class Workout {

    private final WorkoutInput workout;     //todo add fields for db entity
}
