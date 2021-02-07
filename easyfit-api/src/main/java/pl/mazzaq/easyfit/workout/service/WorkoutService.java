package pl.mazzaq.easyfit.workout.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.mazzaq.easyfit.workout.dto.WorkoutConverter;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.repository.WorkoutRepository;
import pl.mazzaq.easyfit.workout.repository.entities.ExerciseData;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;
import pl.mazzaq.easyfit.workout.rest.WorkoutNotFoundException;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class WorkoutService implements WorkoutCrudService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutConverter workoutConverter;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository, WorkoutConverter workoutConverter) {
        this.workoutRepository = workoutRepository;
        this.workoutConverter = workoutConverter;
    }

    @Override
    public WorkoutOutput readById(Integer id) {
        return workoutRepository.findById(id)
                .map(workoutConverter::convert)
                .orElseThrow(WorkoutNotFoundException::new);
    }

    @Override
    public List<WorkoutOutput> readAll() {
        return workoutRepository.findAll().stream()
                .sorted(Comparator.comparing(Workout::getStartTime).reversed())
                .map(workoutConverter::convert)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkoutOutput create(WorkoutInput input) {
        Workout workout = new Workout(input.getStartTime(), input.getDuration());
        List<ExerciseData> exercises = workoutConverter.convert(input.getExercises(), workout);
        workout.setExercises(exercises);

        log.info("Saving to repository workout {}", workout);
        Workout workoutFromDb = workoutRepository.save(workout);
        return workoutConverter.convert(workoutFromDb);
    }

    @Override
    @Transactional
    public boolean delete(Integer workoutId) {
        Optional<Workout> workout = workoutRepository.findById(workoutId);
        if (workout.isPresent()) {
            workoutRepository.delete(workout.get());
            return true;
        }
        log.warn("Did not find matching workout to delete, id: {}", workoutId);
        return false;
    }
}
