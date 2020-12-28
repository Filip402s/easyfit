import React, {useState} from 'react';
import {ExerciseData} from "./WorkoutDay";
import {Set} from "./WorkoutDay";

interface Props {
    exercises: ExerciseData[];
    onDelete: any;
}

function getWeight(set: Set) {
    return set.weight !== "None" ? set.weight + " kg" : "";
}

const CurrentExercisesData: React.FC<Props> = ({onDelete, exercises}) => {

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
                                {getWeight(set)} x {set.reps} reps
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

export default CurrentExercisesData;