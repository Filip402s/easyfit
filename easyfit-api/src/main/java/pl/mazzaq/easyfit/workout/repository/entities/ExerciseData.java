package pl.mazzaq.easyfit.workout.repository.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.mazzaq.easyfit.workout.dto.ExerciseDataInput;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@Entity
public class ExerciseData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer exerciseId;

    private String weight;

    private Integer reps;

    private Integer position;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    public ExerciseData(Integer exerciseId, String weight, Integer reps, Integer position, Workout workout) {
        this.exerciseId = exerciseId;
        this.weight = weight;
        this.reps = reps;
        this.position = position;
        this.workout = workout;
    }

    public static List<ExerciseData> of(List<ExerciseDataInput> exercises, Workout workout) {
        return exercises.stream()
                .map(input -> new ExerciseData(input.getExerciseId(), input.getWeight(), input.getReps(), input.getPosition(), workout))
                .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return "ExerciseData{" +
                "exerciseId=" + exerciseId +
                ", weight='" + weight + '\'' +
                ", reps=" + reps +
                ", position=" + position +
                ", workout=" + workout.getId() +
                '}';
    }
}
