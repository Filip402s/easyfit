package pl.mazzaq.easyfit.workout.service;

public interface CrudService<INPUT, OUTPUT> {

    OUTPUT read(Integer id);

    OUTPUT create(INPUT input);

    boolean delete(Integer workoutId);
}
