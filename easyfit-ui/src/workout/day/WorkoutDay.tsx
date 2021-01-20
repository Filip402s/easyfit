import React, {useState} from 'react';

import 'react-dropdown/style.css';
import WorkoutInfo from "./info/WorkoutInfo";
import AddExerciseSection from "./add/AddExerciseSection";
import CurrentExercisesData from "./CurrentExercisesData";
import {getFinishWorkoutUrl} from "../../helpers/DomainUrlProvider";

interface Props {
    startDate: Date;
}

export interface ExerciseData {
    exerciseId: number;
    exerciseName: string;
    weight: string;
    reps: number;
}

export interface ExerciseDataListElement extends ExerciseData {
    position: number;
}

const WorkoutDay: React.FC<Props> = ({startDate: startTime}) => {

    const [exerciseData, setExerciseData] = useState<ExerciseDataListElement[]>([]);
    const [workoutFinishSuccessMsg, setWorkoutFinishSuccessMsg] = useState<any>("");

    const add = (newExercise: ExerciseData) => {
        const newExercises = [...exerciseData];
        console.log('Adding new exercise, current exercises: ');
        console.log(exerciseData);

        newExercises.push({
            position: exerciseData.length,
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

    const onDeleteExercise = (exercisePosition: number) => {
        const newExercises = exerciseData
            .filter(exercise => exercise.position !== exercisePosition)
            .map((exercise, index) => ({...exercise, position: index}));

        setExerciseData(newExercises);
        console.log("exercises after deletion: ");
        console.log(newExercises);
        return newExercises;
    }

    const setStateToWorkoutFinished = () => {
        console.log("opening workout finished modal");
    }

    const createFinishWorkoutInput = () => {
        return {
            exercises: exerciseData,
            startTime: startTime,
            duration: getDurationMinutes()
        }
    }

    const getDurationMinutes = () => {
        var now = new Date();
        var diffMs = Math.abs(now.getTime() - startTime.getTime()); // milliseconds between now & startTime
        return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    }

    const finish = (event: any) => {
        const axios = require('axios');

        const url = getFinishWorkoutUrl();
        console.log("Finish workout. Sending http POST " + url);
        console.log(exerciseData);

        const finishWorkoutInput = createFinishWorkoutInput();
        console.log(finishWorkoutInput)

        axios.post(url, finishWorkoutInput)
            .then(function (response: any) {
                console.log(response);
                // setWorkoutFinishSuccessMsg(response.data);
                setWorkoutFinishSuccessMsg(JSON.stringify(response.data));
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
            <WorkoutInfo startDate={startTime}/>

            <AddExerciseSection onAddExercise={add}/>

            <CurrentExercisesData onDelete={onDeleteExercise} exercises={exerciseData}/>

            <button onClick={finish}>Finish</button>

            {workoutFinishSuccessMsg && <span>{workoutFinishSuccessMsg}</span>}
        </div>
    )
}

export default WorkoutDay;