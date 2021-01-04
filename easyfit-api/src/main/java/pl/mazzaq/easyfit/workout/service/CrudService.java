package pl.mazzaq.easyfit.workout.service;

public interface CrudService<INPUT, OUTPUT> {

    OUTPUT read(int id);
    OUTPUT create(INPUT input);
}
