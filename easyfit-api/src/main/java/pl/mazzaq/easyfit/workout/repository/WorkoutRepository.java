package pl.mazzaq.easyfit.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {
}
