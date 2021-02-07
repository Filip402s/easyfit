package pl.mazzaq.easyfit.workout.dto.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Constraint(validatedBy = ExerciseExistsValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExerciseExistsConstraint {

    String message() default "Exercise does not exist";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
