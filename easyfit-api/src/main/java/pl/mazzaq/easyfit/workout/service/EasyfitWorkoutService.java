package pl.mazzaq.easyfit.workout.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.mazzaq.easyfit.workout.dto.WorkoutInput;
import pl.mazzaq.easyfit.workout.dto.WorkoutOutput;
import pl.mazzaq.easyfit.workout.share.twitter.EasyfitTweet;
import pl.mazzaq.easyfit.workout.share.twitter.EasyfitTwitterService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class EasyfitWorkoutService {

    private final WorkoutCrudService workoutCrudService;
    private final EasyfitTwitterService twitterService;

    @Autowired
    public EasyfitWorkoutService(WorkoutCrudService workoutCrudService,
                                 EasyfitTwitterService twitterService) {
        this.workoutCrudService = workoutCrudService;
        this.twitterService = twitterService;
    }

    public WorkoutOutput readById(Integer id) {
        return workoutCrudService.readById(id);
    }

    public List<WorkoutOutput> readAll() {
        return new ArrayList<>(workoutCrudService.readAll());
    }

    @Transactional
    public WorkoutOutput create(WorkoutInput input) {
        return workoutCrudService.create(input);
    }

    @Transactional
    public boolean delete(Integer workoutId) {
        return workoutCrudService.delete(workoutId);
    }

    public EasyfitTweet share(Integer workoutId) {
        WorkoutOutput workout = workoutCrudService.readById(workoutId);

        String result = workout.getStartTime() + workout.getExercises() + workout.getDuration();

//        "workout time: " + workout.getStartTime() + " " + workout.getExercises()

        // todo tworzymy zmienną String, która zawiera wyselekcjonowane informacje nt. `workout`
        // -

        return twitterService.postTweet(workout.toString());
    }
}
