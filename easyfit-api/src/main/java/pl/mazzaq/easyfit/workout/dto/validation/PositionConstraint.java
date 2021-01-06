package pl.mazzaq.easyfit.workout.dto.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Constraint(validatedBy = PositionValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface PositionConstraint {

    String message() default "The input list contains invalid position values";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
