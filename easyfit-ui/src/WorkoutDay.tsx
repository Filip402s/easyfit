import React, {useState} from 'react';
import CurrentExercisesData from "./CurrentExercisesData";
import AddExerciseSection from "./AddExerciseSection";

import 'react-dropdown/style.css';
import {getFormattedDate} from "./DateFormatter";

interface Props {
    startDate: Date;
    workout?: SingleWorkout;
}

export interface SingleWorkout {
    exercises: Exercise[];
}

export interface Exercise {
    id: number;
    name: string;
}

export interface Set {
    order: number;
    weight: string;
    reps: number;
}

export interface ExerciseData {
    // id: string = uuid();
    id: string;
    order: number;
    exercise: Exercise;
    sets: Set[];
}

const WorkoutDay: React.FC<Props> = ({startDate, workout}) => {

    const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);

    const workoutStartInfo = () => {
        return <div><span>Workout started at:<br/>{getFormattedDate(startDate)}</span></div>;
    }

    const add = (newExercise: ExerciseData) => {
        const newExercises = [...exerciseData];
        console.log('1. current exercises: ');
        console.log(exerciseData);

        // const newExercise = getNewExercise();

        newExercises.push(newExercise);
        setExerciseData(newExercises);
        console.log('3. new exercises: ');
        console.log(newExercises);
        return newExercises;
    }

    const onDeleteExercise = (exercise: ExerciseData) => {
        const newExercises = exerciseData.filter(obj => obj.id !== exercise.id);
        setExerciseData(newExercises);
        return newExercises;
    }

    function setStateToWorkoutFinished() {
        console.log("opening workout finished modal");
    }

    const save = (event: any) => {
        const host = 'http://localhost:8001';
        console.log("Save: sending exercise data to host: " + host);
        console.log(exerciseData);
        const axios = require('axios');

        axios.post(host + '/workout', exerciseData)
            .then(function (response: any) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("Finished saving.");
                setStateToWorkoutFinished();
            });
    }

    return (
        <div>
            <div>
                {/*<WorkoutInfo />*/}
                {workoutStartInfo()}

                <AddExerciseSection onAdd={add} exercisesData={exerciseData}/>

                <CurrentExercisesData onDelete={onDeleteExercise} exercises={exerciseData}/>

                <button onClick={save}>Save</button>
            </div>
        </div>
    )
}

export default WorkoutDay;