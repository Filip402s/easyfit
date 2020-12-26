import React, {useState} from 'react';
import ExercisesData from "./ExercisesData";

import * as uuid from "uuid";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props {
    workout?: SingleWorkout;
}

export interface SingleWorkout {
    exercises: Exercise[];
}

export interface Exercise {
    id: string;
    name: string;
}

export interface Set {
    order: number;
    weight: number;
    reps: number;
}

export interface ExerciseData {
    // id: string = uuid();
    id: string;
    order: number;
    exercise: Exercise;
    sets: Set[];
}

const WorkoutDay: React.FC<Props> = ({workout}) => {

    const exercises: Exercise[] = [{id: uuid.v4(), name: "Deadlift"}, {id: uuid.v4(), name: "Bench press"},
        {id: uuid.v4(), name: "Pullups"}, {id: uuid.v4(), name: "Rows"}, {id: uuid.v4(), name: "Squats"}];
    const exerciseOptions = ['Bench press', 'Deadlift', 'Pullups', 'Rows'];
    const weightOptions = ['20', '30', '40', '50', '60', '70', '80'];
    const repsOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    const defaultExercise = exercises.find(exercise => exercise.name === "Deadlift") || exercises[0];

    const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<string>("Bench press");
    const [selectedWeight, setSelectedWeight] = useState<string>('20');
    const [selectedReps, setSelectedReps] = useState<string>('6');

    const date = new Date();

    const add = () => {
        const newExercises = [...exerciseData];
        console.log('1. current exercises: ');
        console.log(exerciseData);

        let exercise = exercises.find(e => e.name === selectedExercise);
        console.log('2. selected exercise: ' +  JSON.stringify(exercise));
        console.log(exercise);
        const newExercise: ExerciseData = {
            id: uuid.v4(),
            exercise: exercise || defaultExercise,
            order: 0,
            sets: [{weight: +selectedWeight, reps: +selectedReps, order: 0}]
        }
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

    const onExerciseChange = (event: any) => {
        setSelectedExercise(event.value);
        console.log("selected exercise:" + event.value);
    }

    const onWeightChange = (event: any) => {
        setSelectedWeight(event.value);
    }

    const onRepsChange = (event: any) => {
        console.log("selected reps: " + event.value);
        setSelectedReps(event.value);
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

    const onExerciseChangeButton = (value: string) => {
        setSelectedExercise(value);
        console.log("selected exercise:" + value);
    }

    const onWeightChangeButton = (value: string) => {
        setSelectedWeight(value);
    }
    const onRepsChangeButton = (value: string) => {
        setSelectedReps(value);
    }


    return (
        <div key={Math.random()}>
            <div>Workout on {date.toTimeString()}</div>

            <div>

                {selectedExercise && <div>
                    <div>Exercise: {selectedExercise}</div>
                </div>}
                {selectedWeight && <div>
                    <div>Weight: {selectedWeight}</div>
                </div>}
                {selectedReps && <div>
                    <div>Reps: {selectedReps}</div>
                </div>}

                {/*<ExercisesOptions onChange={onExerciseChange}>*/}
                {/**/}
                {/*</ExercisesOptions>*/}
                <div>
                    <Dropdown options={exerciseOptions} onChange={onExerciseChange} value={selectedExercise}
                              placeholder="Exercise"/>
                    <button onClick={() => onExerciseChangeButton('Bench press')}>Bench press</button>
                </div>
                <div>
                    <span>Weight:</span>
                    <Dropdown options={weightOptions} onChange={onWeightChange} value={selectedWeight}
                              placeholder="Weight"/>
                    <button onClick={() => onWeightChangeButton('60')}>60</button>
                </div>
                <div>
                    <span>Reps:</span>
                    <Dropdown options={repsOptions} onChange={onRepsChange} value={selectedReps} placeholder="Reps"/>
                    <button onClick={() => onRepsChangeButton('6')}>6</button>
                </div>
            </div>

            <button onClick={add}>Add exercise</button>

            <ExercisesData onDelete={onDeleteExercise} exercises={exerciseData}/>

            <button onClick={save}>Save</button>

        </div>
    )
}

export default WorkoutDay;