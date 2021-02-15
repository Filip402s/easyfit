package pl.mazzaq.easyfit.workout.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.dto.WorkoutConverter;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.repository.WorkoutRepository;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;
import pl.mazzaq.easyfit.workout.rest.WorkoutNotFoundException;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class LocalWorkoutCrudService implements WorkoutCrudService {

    private final WorkoutConverter workoutConverter;
    private final WorkoutRepository workoutRepository;

    @Autowired
    public LocalWorkoutCrudService(WorkoutConverter workoutConverter,
                                   WorkoutRepository workoutRepository) {
        this.workoutConverter = workoutConverter;
        this.workoutRepository = workoutRepository;
    }

    @Override
    public WorkoutOutput readById(Integer id) {
        return workoutRepository.findById(id)
                .map(workoutConverter::convertToOutput)
                .orElseThrow(WorkoutNotFoundException::new);
    }

    @Override
    public Collection<WorkoutOutput> readAll() {
        return workoutRepository.findAll().stream()
                .sorted(Comparator.comparing(Workout::getStartTime).reversed())
                .map(workoutConverter::convertToOutput)
                .collect(Collectors.toList());
    }

    @Override
    public WorkoutOutput create(WorkoutInput workoutInput) {
        Workout workout = workoutConverter.convert(workoutInput);

        log.info("Saving to repository workout {}", workout);
        Workout workoutFromDb = workoutRepository.save(workout);

        return workoutConverter.convertToOutput(workoutFromDb);
    }

    @Override
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
