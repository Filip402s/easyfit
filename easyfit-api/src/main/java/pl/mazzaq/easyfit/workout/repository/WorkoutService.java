package pl.mazzaq.easyfit.workout.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.repository.entities.ExerciseData;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;
import pl.mazzaq.easyfit.workout.service.WorkoutCrudService;

import java.util.List;

@Slf4j
@Service
public class WorkoutService implements WorkoutCrudService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    public WorkoutOutput read(Integer id) {
        return null;
//        return workoutRepository.findById(id)
//                .map(WorkoutOutput::of)
//                .orElseThrow(WorkoutNotFoundException::new);
    }

    @Override
//    @Transactional
    public WorkoutOutput create(WorkoutInput input) {
        Workout workout = new Workout(input.getStartTime(), input.getDuration());
        List<ExerciseData> exercises = ExerciseData.of(input.getExercises(), workout);
        workout.setExercises(exercises);

        log.info("Saving to repository workout {}", workout);
//        Workout workoutFromDb = workoutRepository.save(workout);
//        return WorkoutOutput.of(workoutFromDb);
        return null;
    }

    @Override
//    @Transactional
    public boolean delete(Integer workoutId) {
//        Optional<Workout> workout = workoutRepository.findById(workoutId);
//        if (workout.isPresent()) {
//            workoutRepository.delete(workout.get());
//            return true;
//        }
        log.warn("Did not find matching workout to delete, id: {}", workoutId);
        return false;
    }
}
