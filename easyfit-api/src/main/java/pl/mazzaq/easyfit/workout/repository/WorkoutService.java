package pl.mazzaq.easyfit.workout.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.rest.WorkoutNotFoundException;
import pl.mazzaq.easyfit.workout.service.WorkoutCrudService;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;

@Slf4j
@Service
public class WorkoutService implements WorkoutCrudService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    public WorkoutOutput read(int id) {
        return workoutRepository.findById(id)
                .map(WorkoutOutput::of)
                .orElseThrow(WorkoutNotFoundException::new);
    }

    @Override
    @Transactional
    public WorkoutOutput create(WorkoutInput input) {

        //todo adding exercises

        Workout workout = new Workout(input);
        log.info("Saving to repository workout {}", workout);
        Workout workoutFromDb = workoutRepository.save(workout);
        return WorkoutOutput.of(workoutFromDb);
    }
}
