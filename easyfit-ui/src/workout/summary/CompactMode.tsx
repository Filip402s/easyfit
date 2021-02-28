import React from 'react';
import {Workout} from "../history/WorkoutHistory";
import {ExerciseDataListElement} from "../day/WorkoutDay";
import {getWeight} from "../day/CurrentExercisesData";
import {getFormattedDateTime} from "../../helpers/DateFormatter";
import { totalmem } from 'os';

interface Props {
    index?: number;
    workout: Workout;
}

const CompactMode: React.FC<Props> = ({index = 0, workout}) => {

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

    const renderCompactView = (exercises: ExerciseDataListElement[]) => {
        let workoutTotals: any = {};
        
        exercises.map(exercise => { workoutTotals[exercise.exerciseName] = {totalReps: 0, totalSets: 0} })
        exercises.reduce((cum, cur): any => {
            return workoutTotals[cur.exerciseName] = {totalReps: cur.reps + workoutTotals[cur.exerciseName].totalReps, totalSets: workoutTotals[cur.exerciseName].totalSets + 1};
        }, workoutTotals);

        return Object.entries(workoutTotals).map((exercise: any) => 
            <p>{`${exercise[0]}: Total sets: ${exercise[1].totalSets} Total reps: ${exercise[1].totalReps}`}</p>
        );
    }

    return (
        <div>
            {renderWorkoutDate(workout, index)}
            {renderDuration(workout.duration)}
            {renderCompactView(workout.exercises)}
        </div>
    );

}

export default CompactMode;