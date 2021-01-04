package pl.mazzaq.easyfit.workout.repository.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@ToString
@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Timestamp startTime;

    private Integer duration;

    public Workout(WorkoutInput input) {
        this.startTime = Timestamp.valueOf(input.getStartTime());
        this.duration = input.getDuration();
        //todo set exercises
    }
}



