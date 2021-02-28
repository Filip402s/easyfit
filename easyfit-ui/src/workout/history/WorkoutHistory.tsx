import React, {useEffect, useState} from "react";
import {ExerciseDataListElement} from "../day/WorkoutDay";
import WorkoutHistoryListItem from "../summary/WorkoutHistoryListItem";

interface Props {
    workoutData: any
}

export interface Workout {
    id: number;
    startTime: string;
    duration: number;
    exercises: ExerciseDataListElement[];
}

const WorkoutHistory: React.FC<Props> = ({workoutData}) => {

    const {loading, error, workouts} = workoutData;

    const renderWorkouts = () => {
        return (
            <div>
                {!loading && [...workouts].map((workout: Workout, index: number) =>
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