import React from 'react';
import {ExerciseData} from "./WorkoutDay";

interface Props {
    exercises: ExerciseData[];
}

const ExercisesOptions: React.FC<Props> = ({exercises}) => {
    const exerciseOptions = ['Bench press', 'Deadlift', 'Pullups', 'Rows'];

    return (
        <div>
            {exercises.map((exercise: ExerciseData) =>
                <>
                    <p key={Math.random()}>
                        {exercise.exercise.name}
                    </p>
                    <div>
                        {exercise.sets.map((set )=>
                        <p key={Math.random()}>
                            {set.weight}kg x {set.reps} reps
                        </p>
                    )}</div>
                </>
            )}
        </div>
    )
}

export default ExercisesOptions;