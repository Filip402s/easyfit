package pl.mazzaq.easyfit.workout.dto.validation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import pl.mazzaq.easyfit.workout.dto.ExerciseDataInput;
import pl.mazzaq.easyfit.workout.repository.ExerciseRepository;
import pl.mazzaq.easyfit.workout.repository.entities.Exercise;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public class ExerciseExistsValidator implements ConstraintValidator<ExerciseExistsConstraint, ExerciseDataInput> {

    @Autowired
    private ExerciseRepository exerciseRepository;

    public void initialize(ExerciseExistsConstraint constraint) {
    }

    public boolean isValid(ExerciseDataInput exerciseDataInput, ConstraintValidatorContext context) {
        if (exerciseDataInput == null || exerciseDataInput.getExerciseId() == null) {
            return false;
        }
        return exerciseRepository.existsById(exerciseDataInput.getExerciseId());
    }
}
