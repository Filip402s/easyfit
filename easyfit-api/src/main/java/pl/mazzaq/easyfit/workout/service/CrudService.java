package pl.mazzaq.easyfit.workout.service;

import java.util.Collection;
import java.util.Optional;

public interface CrudService<INPUT, OUTPUT> {

    Optional<OUTPUT> readById(Integer id);

    Collection<OUTPUT> readAll();

    OUTPUT create(INPUT input);

    boolean delete(Integer workoutId);

    void deleteAll();

}
