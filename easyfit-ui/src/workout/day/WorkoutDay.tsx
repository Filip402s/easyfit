import React, {useState} from 'react';

import 'react-dropdown/style.css';
import WorkoutInfo from "./info/WorkoutInfo";
import AddExerciseSection from "./add/AddExerciseSection";
import CurrentExercisesData from "./CurrentExercisesData";
import {getAbsoluteDomainUrl, getFinishWorkoutUrl} from "../../helpers/DomainUrlProvider";

interface Props {
    startDate: Date;
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
    exerciseId: number;
    exerciseName: string;
    weight: string;
    reps: number;
}

export interface ExerciseDataListElement extends ExerciseData {
    order: number;
}

const WorkoutDay: React.FC<Props> = ({startDate}) => {

    const [exerciseData, setExerciseData] = useState<ExerciseDataListElement[]>([]);

    const add = (newExercise: ExerciseData) => {
        const newExercises = [...exerciseData];
        console.log('Adding new exercise, current exercises: ');
        console.log(exerciseData);

        newExercises.push({
            order: exerciseData.length,
            exerciseId: newExercise.exerciseId,
            exerciseName: newExercise.exerciseName,
            reps: newExercise.reps,
            weight: newExercise.weight
        });
        setExerciseData(newExercises);
        console.log('Exercises after add: ');
        console.log(newExercises);
        return newExercises;
    }

    const onDeleteExercise = (exerciseOrder: number) => {
        const newExercises = exerciseData
            .filter(exercise => exercise.order !== exerciseOrder)
            .map((exercise, index) => ({...exercise, order: index}));

        setExerciseData(newExercises);
        console.log("exercises after deletion: ");
        console.log(newExercises);
        return newExercises;
    }

    function setStateToWorkoutFinished() {
        console.log("opening workout finished modal");
    }

    const finish = (event: any) => {
        const axios = require('axios');

        let url = getFinishWorkoutUrl();
        console.log("Testing POST " + url);
        console.log(exerciseData);

        axios.post(url, {exercises: exerciseData})
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
        const axios = require('axios');

        const url = getAbsoluteDomainUrl() + "/";
        console.log("Testing GET " + url);

        axios.get(url)
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

                <button onClick={finish}>Finish</button>
                <button onClick={testApi}>Test</button>
            </div>
        </div>
    )
}

export default WorkoutDay;