package pl.mazzaq.easyfit.workout.repository.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class ExerciseData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    private String weight;

    private Integer reps;

    private Integer position;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    public ExerciseData(Exercise exercise, String weight, Integer reps, Integer position, Workout workout) {
        this.exercise = exercise;
        this.weight = weight;
        this.reps = reps;
        this.position = position;
        this.workout = workout;
    }

    @Override
    public String toString() {
        return "ExerciseData{" +
                "exerciseId=" + exercise.getId() +
                ", weight='" + weight + '\'' +
                ", reps=" + reps +
                ", position=" + position +
                ", workout=" + workout.getId() +
                '}';
    }
}
