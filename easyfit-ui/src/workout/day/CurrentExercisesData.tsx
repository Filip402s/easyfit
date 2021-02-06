import React from 'react';
import {ExerciseDataListElement} from "./WorkoutDay";

interface Props {
    onDelete: any;
    onDuplicate: any;
    exercises: ExerciseDataListElement[];
}

function getWeight(weight: string) {
    return weight !== "None" ? weight + " kg" : "Bodyweight";
}

const CurrentExercisesData: React.FC<Props> = ({onDelete, onDuplicate, exercises}) => {

    const deleteExercise = (exercisePosition: number) => {
        onDelete(exercisePosition);
    }

    const duplicateExercise = (exercisePosition: number) => {
        onDuplicate(exercisePosition);
    }

    return (
        <div>
            {exercises.map((exercise: ExerciseDataListElement) =>
                <p key={Math.random()}>
                    {exercise.position + 1}. {exercise.exerciseName}: {getWeight(exercise.weight)} x {exercise.reps} reps
                    <button onClick={() => deleteExercise(exercise.position)}>x</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={() => duplicateExercise(exercise.position)}>Duplicate</button>
                </p>
            )}
        </div>
    )
}

export default CurrentExercisesData;