import React from 'react';
import {Workout} from "../history/WorkoutHistory";
import {ExerciseDataListElement} from "../day/WorkoutDay";
import {getWeight} from "../day/CurrentExercisesData";
import {getFormattedDateTime} from "../../helpers/DateFormatter";

interface Props {
    index?: number
    workout: Workout;
}

const WorkoutHistoryListItem: React.FC<Props> = ({index = 0, workout}) => {

    const renderDuration = (duration: number) => {
        if (duration == null || duration === 0) {
            return "";
        } else {
            return "duration: " + duration + " minutes";
        }
    }

    const renderWorkoutDate = (workout: Workout, index: number) => {
        return <>{index + 1}: {getFormattedDateTime(new Date(Date.parse(workout.startTime)))}{<br/>}</>;
    }

    const renderExerciseData = (exercises: ExerciseDataListElement[]) => {
        return exercises.map((exercise, i) =>
            <p key={i.toString() + Math.random()}>&nbsp;{exercise.position + 1}. {exercise.exerciseName}:&nbsp;{getWeight(exercise.weight)} x {exercise.reps}</p>
        );
    }

    return (
        <div key={index.toString()}>
            {renderWorkoutDate(workout, index)}
            {renderDuration(workout.duration)}
            {renderExerciseData(workout.exercises)}
        </div>
    )

}
export default WorkoutHistoryListItem;