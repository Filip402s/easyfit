import React from 'react';
import {ExerciseDataListElement} from "./WorkoutDay";

interface Props {
    onDelete: any;
    onDuplicate: any;
    onEditReps: any;
    exercises: ExerciseDataListElement[];
}

function getWeight(weight: string) {
    return weight !== "None" ? weight + " kg" : "Bodyweight";
}

const CurrentExercisesData: React.FC<Props> = ({onDelete, onDuplicate, onEditReps, exercises}) => {

    const deleteExercise = (exercisePosition: number) => {
        onDelete(exercisePosition);
    }

    const duplicateExercise = (exercisePosition: number) => {
        onDuplicate(exercisePosition);
    }
    const editReps = (exercisePosition: number, newValue: number) => {
        onEditReps(exercisePosition, newValue);
    }

    return (
        <div>
            {exercises.map((exercise: ExerciseDataListElement, index) =>
                <p key={index.toString()}>
                    {exercise.position + 1}. {exercise.exerciseName}: {getWeight(exercise.weight)} x {exercise.reps}
                    <button onClick={() => editReps(exercise.position, exercise.reps + 1)}>+</button>
                    <button onClick={() => editReps(exercise.position, exercise.reps - 1)}>-</button>
                    reps
                    <button onClick={() => deleteExercise(exercise.position)}>x</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={() => duplicateExercise(exercise.position)}>Duplicate</button>
                </p>
            )}
        </div>
    )
}

export default CurrentExercisesData;