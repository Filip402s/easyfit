import React, {useEffect, useState} from "react";
import {getWorkoutUrl} from "../../helpers/DomainUrlProvider";
import {ExerciseDataListElement} from "../day/WorkoutDay";
import {getFormattedDateTime} from "../../helpers/DateFormatter";
import {getWeight} from "../day/CurrentExercisesData";

interface Props {
}

interface Workout {
    id: number;
    startTime: string;
    duration: number;
    exercises: ExerciseDataListElement[];
}

const WorkoutHistory: React.FC<Props> = () => {

    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const axios = require('axios');

        const url = getWorkoutUrl();
        console.log("Workout history. Calling http GET " + url);

        axios.get(url)
            .then(function (response: any) {
                console.log("Response from history endpoint: ");
                console.log(response);
                const history = response.data;
                setWorkouts(history);
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("Finished getting history.");
            });
    }

    const renderDuration = (duration: number) => {
        if (duration == null || duration === 0) {
            return "";
        } else {
            return "duration: " + duration + " minutes";
        }
    }

    const renderExerciseData = (exercises: ExerciseDataListElement[]) => {
        return exercises.map((exercise, i) =>
            <p key={i.toString() + Math.random()}>&nbsp;{exercise.position + 1}. {exercise.exerciseName}:&nbsp;{getWeight(exercise.weight)} x {exercise.reps}</p>
        );
    }

    const renderWorkoutDate = (workout: Workout, index: number) => {
        return <>{index + 1}: {getFormattedDateTime(new Date(Date.parse(workout.startTime)))}{<br/>}</>;
    }

    const renderWorkouts = () => {
        return (
            <div>
                {workouts.length > 0 && workouts.map((workout: Workout, index: number) =>
                    <div key={index.toString()}>
                        {renderWorkoutDate(workout, index)}
                        {renderDuration(workout.duration)}
                        {renderExerciseData(workout.exercises)}
                    </div>
                )}
                {workouts.length == 0 &&
                    <div>
                        nothing added yet
                    </div>
                }
            </div>
        );
    }

    return (
        <div>
            Workouts: <br/>{renderWorkouts()}
        </div>
    )
}

export default WorkoutHistory;