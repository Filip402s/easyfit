import React, {useEffect, useState} from "react";
import {getWorkoutUrl} from "../../helpers/DomainUrlProvider";
import {ExerciseDataListElement} from "../day/WorkoutDay";
import {getFormattedDateTime} from "../../helpers/DateFormatter";
import {getWeight} from "../day/CurrentExercisesData";
import WorkoutHistoryListItem from "../summary/WorkoutHistoryListItem";

interface Props {
}

export interface Workout {
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

    const renderWorkouts = () => {
        return (
            <div>
                {workouts.length > 0 && workouts.map((workout: Workout, index: number) =>
                    <WorkoutHistoryListItem index={index} workout={workout}/>
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