import React, {useState} from 'react';
import {ExerciseData} from "./WorkoutDay";

interface Props {
    exercises: ExerciseData[];
    onDelete: any;
}

const ExercisesData: React.FC<Props> = ({onDelete, exercises}) => {

    // const [exerciseInside, setExerciseInside] = useState<number>(0);

    const deleteExercise = (exercise: ExerciseData) => {
        onDelete(exercise);
    }

    return (
        <div>
            {exercises.map((exercise: ExerciseData) =>
                <div key={Math.random()}>
                    <p key={Math.random()}>
                        {exercise.exercise.name}
                    </p>
                    <div>
                        {exercise.sets.map((set) =>
                            <p key={Math.random()}>
                                {set.weight}kg x {set.reps} reps
                            </p>
                        )}
                        <button onClick={() => deleteExercise(exercise)}>x</button>
                    </div>
                </div>
            )}
            {/*<p>Value: {exerciseInside}</p>*/}
        </div>
    )
}

export default ExercisesData;