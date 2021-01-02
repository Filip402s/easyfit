import React, {useState} from 'react';

import 'react-dropdown/style.css';
import WorkoutInfo from "./info/WorkoutInfo";
import AddExerciseSection from "./add/AddExerciseSection";
import CurrentExercisesData from "./CurrentExercisesData";

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
        const host = 'http://localhost:8080';
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

    const testApi = (event: any) => {
        const host = 'http://localhost:8080';
        console.log("Testing api: " + host);
        const axios = require('axios');

        // axios.get(host)
        axios.get("/")
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
                <WorkoutInfo startDate={startDate}/>

                <AddExerciseSection onAddExercise={add}/>

                <CurrentExercisesData onDelete={onDeleteExercise} exercises={exerciseData}/>

                <button onClick={save}>Save</button>
                <button onClick={testApi}>Test</button>
            </div>
        </div>
    )
}

export default WorkoutDay;