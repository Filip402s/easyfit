package pl.mazzaq.easyfit.workout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.mazzaq.easyfit.workout.dto.validation.PositionConstraint;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class WorkoutInput {

    @NotNull
    @PositionConstraint
    List<@Valid ExerciseDataInput> exercises;

    @NotNull
    LocalDateTime startTime;

    @NotNull
    @Min(value = 0)
    Integer duration; // in minutes
}
