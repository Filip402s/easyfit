package pl.mazzaq.easyfit.workout.service;

import java.util.Collection;

public interface CrudService<INPUT, OUTPUT> {

    OUTPUT readById(Integer id);

    Collection<OUTPUT> readAll();

    OUTPUT create(INPUT input);

    boolean delete(Integer workoutId);

    void deleteAll();

}
