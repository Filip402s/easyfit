package pl.mazzaq.easyfit.workout.repository.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Timestamp startTime;

    private Integer duration;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    private List<ExerciseData> exercises;

    public Workout(LocalDateTime startTime, Integer duration) {
        this.startTime = Timestamp.valueOf(startTime);
        this.duration = duration;
    }

    @Override
    public String toString() {
        return "Workout{" +
                "startTime=" + startTime +
                ", duration=" + duration +
                ", exercises=" + exercises +
                '}';
    }
}



