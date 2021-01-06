package pl.mazzaq.easyfit.workout.dto.validation;

import lombok.extern.slf4j.Slf4j;
import pl.mazzaq.easyfit.workout.dto.ExerciseDataInput;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public class PositionValidator implements ConstraintValidator<PositionConstraint, List<ExerciseDataInput>> {

    public void initialize(PositionConstraint constraint) {
    }

    public boolean isValid(List<ExerciseDataInput> exercises, ConstraintValidatorContext context) {
        if (exercises.size() <= 0) {
            return true;
        }
        Set<Integer> inputPositions = exercises.stream()
                .map(ExerciseDataInput::getPosition)
                .collect(Collectors.toSet());
        Set<Integer> expectedPositions = getExpectedPositionsSet(exercises.size());

        return expectedPositions.equals(inputPositions);
    }

    private Set<Integer> getExpectedPositionsSet(int size) {
        Set<Integer> result = new HashSet<>();
        for (int i = 0; i < size; i++) {
            result.add(i);
        }
        return result;
    }
}
