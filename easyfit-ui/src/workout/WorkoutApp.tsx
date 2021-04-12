import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import WorkoutDay, {ExerciseDataListElement} from "./day/WorkoutDay";
import WorkoutHistory, {Workout} from "./history/WorkoutHistory";
import WorkoutSummary from "./summary/WorkoutSummary";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {deleteWorkoutsHistory, listWorkouts} from "../redux/actions/WorkoutAction";
import axios from "axios";
import {getTemplatesUrl} from "../helpers/DomainUrlProvider";

interface Props {
}

interface Template {
    id: number;
    name: string;
}

enum Tabs {
    History,
    WorkoutDay,
    Summary
}


const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`

const WorkoutApp: React.FC<Props> = () => {

    const [exerciseData, setExerciseData] = useState<ExerciseDataListElement[]>([]);
    const [tab, setTab] = useState(Tabs.History);
    const [workoutStartDate, setWorkoutStartDate] = useState<Date>(new Date());
    const [lastWorkout, setLastWorkout] = useState<Workout>();
    const [templates, setTemplates] = useState<Template []>([]);

    const dispatch = useDispatch();
    const workoutData = useSelector((state: RootStateOrAny) => state.workoutData);

    useEffect(() => {
        console.log("WorkoutApp component did mount");
        dispatch(listWorkouts());
        getTemplates();
    }, [dispatch]);

    const startWorkout = () => {
        setWorkoutStartDate(new Date());
        setTab(Tabs.WorkoutDay);
        clearExerciseData();
    }


    const clearExerciseData = () => {
        setExerciseData([]);
    }

    const backToWorkout = () => {
        setTab(Tabs.WorkoutDay);
    }

    const deleteHistory = () => {
        if (window.confirm("Delete all workouts?")) {
            dispatch(deleteWorkoutsHistory())
            console.log("History deleted")
        }
    };

    const openHistoryTab = () => {
        setTab(Tabs.History);
    }

    const onWorkoutSaveSuccess = (savedWorkout: any) => {
        setLastWorkout(savedWorkout);
        console.log("Saved workout:");
        console.log(savedWorkout);
        setTab(Tabs.Summary);
    }

    const onExercisesDataChange = (newExercisesData: any) => {
        setExerciseData(newExercisesData);
        console.log(newExercisesData);
    }


    const getTemplates = () => {
        const url = getTemplatesUrl();
        axios.get(url)
            .then(function (response: any) {
                const templates: Template[] = response.data;
                setTemplates(templates);
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("Finished getting templates.");
            });
    }

    return (
        <div>
            <div key={Math.random()}>
                {tab == Tabs.History &&
                <div>
                    <button onClick={() => backToWorkout()}>Back</button>
                    <button onClick={() => startWorkout()}>Start Workout!</button>
                    {workoutData.workouts.length === 0 ?
                        null
                        :
                        <button onClick={() => deleteHistory()}>Delete history</button>
                    }
                    <WorkoutHistory workoutData={workoutData}/>
                    <Button>I'm purple.</Button>
                </div>
                }
                {tab == Tabs.WorkoutDay &&
                <div>
                    <button onClick={() => openHistoryTab()}>History</button>
                    <WorkoutDay exerciseData={exerciseData}
                                onExercisesDataChange={onExercisesDataChange}
                                startDate={workoutStartDate}
                                onSuccess={onWorkoutSaveSuccess}
                                onClearExerciseData={clearExerciseData}>
                    </WorkoutDay>
                </div>
                }
                {tab == Tabs.Summary &&
                <div>
                    <button onClick={() => openHistoryTab()}>History</button>
                    <button onClick={() => startWorkout()}>Start Workout!</button>
                    {templates.map((template: Template) => <button>{template.name}</button>)}
                    {lastWorkout && <WorkoutSummary workout={lastWorkout}>
                    </WorkoutSummary>}
                </div>
                }
            </div>
        </div>
    )
}

export default WorkoutApp;