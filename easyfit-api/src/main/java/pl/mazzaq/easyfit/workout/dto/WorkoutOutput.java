package pl.mazzaq.easyfit.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;

import java.util.List;

@Data
@ToString
@AllArgsConstructor
public class WorkoutOutput {

    private final Integer id;
    private final String startTime;
    private final Integer duration;
    private final List<ExerciseDataOutput> exercises;

    public static WorkoutOutput of(Workout workout) {
        return new WorkoutOutput(
                workout.getId(),
                workout.getStartTime().toLocalDateTime().toString(),
                workout.getDuration(),
                ExerciseDataOutput.of(workout.getExercises()));
    }
}
