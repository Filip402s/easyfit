package pl.mazzaq.easyfit.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.mazzaq.easyfit.workout.repository.entities.Exercise;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
}
