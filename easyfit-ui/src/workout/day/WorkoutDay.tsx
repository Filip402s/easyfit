import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { listWorkouts } from "../../redux/actions/WorkoutAction";
import 'react-dropdown/style.css';
import WorkoutInfo from "./info/WorkoutInfo";
import AddExerciseSection from "./add/AddExerciseSection";
import CurrentExercisesData from "./CurrentExercisesData";
import {getWorkoutUrl} from "../../helpers/DomainUrlProvider";
import { couldStartTrivia } from 'typescript';

interface Props {
    exerciseData: ExerciseDataListElement[];
    startDate: Date;
    onSuccess: any;
    onExercisesDataChange: any;
    onClearExerciseData: any;
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

const WorkoutDay: React.FC<Props> = ({startDate: startTime, onSuccess, onExercisesDataChange, exerciseData, onClearExerciseData}) => {

    const dispatch = useDispatch();

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
        onExercisesDataChange(newExercises);
        // setExerciseData(newExercises);
        console.log('Exercises after add: ');
        console.log(newExercises);
        return newExercises;
    }

    const onDeleteExercise = (exercisePosition: number) => {
        const newExercises = exerciseData
            .filter(exercise => exercise.position !== exercisePosition)
            .map((exercise, index) => ({...exercise, position: index}));

        onExercisesDataChange(newExercises);
        console.log("exercises after deletion: ");
        console.log(newExercises);
        return newExercises;
    }

    const onDuplicateExercise = (exercisePosition: number) => {
        const toDuplicate: ExerciseDataListElement | null = exerciseData.find(exercise => exercise.position === exercisePosition) || null;
        if (toDuplicate != null) {
            var newExercise = Object.assign({}, toDuplicate);
            newExercise.position = exerciseData.length;
            const newExercises: Array<ExerciseDataListElement> = [];
            exerciseData.forEach(val => newExercises.push(Object.assign({}, val)));
            newExercises.push(newExercise);

            onExercisesDataChange(newExercises);
            console.log("exercises after duplicate: ");
            console.log(newExercises);
            return newExercises;
        }
    }

    const onEditReps = (exercisePosition: number, newValue: number) => {
        const modified: ExerciseDataListElement | null = exerciseData.find(exercise => exercise.position === exercisePosition) || null;
        if (modified != null) {
            modified.reps = newValue;
            const newExercises: Array<ExerciseDataListElement> = [];
            exerciseData.forEach(val => newExercises.push(Object.assign({}, val)));

            onExercisesDataChange(newExercises);
            console.log("exercises after edit: ");
            console.log(newExercises);
            return newExercises;
        }
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

    const success = (savedWorkout: any) => {
        onSuccess(savedWorkout);
    }

    const finish = (event: any) => {
        const axios = require('axios');

        const url = getWorkoutUrl();
        console.log("Finish workout. Sending http POST " + url);
        console.log(exerciseData);

        const finishWorkoutInput = createFinishWorkoutInput();
        console.log(finishWorkoutInput)

        axios.post(url, finishWorkoutInput)
        .then(function (response: any) {
            console.log(response);
            success(response.data);
            dispatch(listWorkouts());
            onClearExerciseData();
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

            <CurrentExercisesData onDelete={onDeleteExercise}
                                  onDuplicate={onDuplicateExercise}
                                  onEditReps={onEditReps}
                                  exercises={exerciseData}/>

            <button onClick={finish}>Finish</button>
        </div>
    )
}

export default WorkoutDay;