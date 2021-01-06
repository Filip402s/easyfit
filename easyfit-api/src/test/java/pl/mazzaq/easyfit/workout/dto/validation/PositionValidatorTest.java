package pl.mazzaq.easyfit.workout.dto.validation;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.mazzaq.easyfit.workout.dto.ExerciseDataInput;

import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@ExtendWith(MockitoExtension.class)
class PositionValidatorTest {

    @Mock
    ConstraintValidatorContext constraintValidatorContext;

    @InjectMocks
    PositionValidator validator;

    @Test
    void shouldReturnTrueIfEmptyExercises() {
        //given
        List<ExerciseDataInput> input = emptyList();

        //when
        boolean result = validator.isValid(input, constraintValidatorContext);

        //then
        assertTrue(result);
    }
    @Test
    void shouldReturnTrueIfOrderedPositionsStartingWithZero() {
        //given
        List<ExerciseDataInput> input = exerciseData();

        //when
        boolean result = validator.isValid(input, constraintValidatorContext);

        //then
        assertTrue(result);
    }

    @Test
    void shouldReturnFalseIfOrderedPositionsProvidedWithoutZero() {
        //given
        List<ExerciseDataInput> input = inputStartingWithOne();

        //when
        boolean result = validator.isValid(input, constraintValidatorContext);

        //then
        assertFalse(result);
    }

    @Test
    void shouldReturnFalseIfGivenPositionsIncorrect() {
        //given
        List<ExerciseDataInput> input = withIncorrectPositions();

        //when
        boolean result = validator.isValid(input, constraintValidatorContext);

        //then
        assertFalse(result);
    }

    private List<ExerciseDataInput> exerciseData() {
        ExerciseDataInput input = input(0);
        ExerciseDataInput input2 = input(1);
        List<ExerciseDataInput> result = new ArrayList<>();
        result.add(input);
        result.add(input2);
        return result;
    }

    private List<ExerciseDataInput> withIncorrectPositions() {
        ExerciseDataInput input = input(3);
        ExerciseDataInput input2 = input(1);
        List<ExerciseDataInput> result = new ArrayList<>();
        result.add(input);
        result.add(input2);
        return result;
    }

    private List<ExerciseDataInput> inputStartingWithOne() {
        ExerciseDataInput input = input(3);
        ExerciseDataInput input2 = input(2);
        ExerciseDataInput input3 = input(1);
        List<ExerciseDataInput> result = new ArrayList<>();
        result.add(input);
        result.add(input2);
        result.add(input3);
        return result;
    }

    private ExerciseDataInput input(int position) {
        return new ExerciseDataInput(0, "name", "1", 10, position);
    }
}