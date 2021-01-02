import React from 'react';
import {ExerciseDataListElement} from "./WorkoutDay";

interface Props {
    onDelete: any;
    exercises: ExerciseDataListElement[];
}

function getWeight(weight: string) {
    return weight !== "None" ? weight + " kg" : "Bodyweight";
}

const CurrentExercisesData: React.FC<Props> = ({onDelete, exercises}) => {

    const deleteExercise = (exerciseOrder: number) => {
        onDelete(exerciseOrder);
    }

    return (
        <div>
            {exercises.map((exercise: ExerciseDataListElement) =>
                <p key={Math.random()}>
                        {exercise.order + 1}. {exercise.exerciseName}: {getWeight(exercise.weight)} x {exercise.reps} reps
                        <button onClick={() => deleteExercise(exercise.order)}>x</button>
                </p>
            )}
        </div>
    )
}

export default CurrentExercisesData;