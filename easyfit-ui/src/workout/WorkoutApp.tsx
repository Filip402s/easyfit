import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import WorkoutDay, {ExerciseDataListElement} from "./day/WorkoutDay";
import WorkoutHistory, {Workout} from "./history/WorkoutHistory";
import WorkoutSummary from "./summary/WorkoutSummary";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {deleteWorkoutsHistory, listWorkouts} from "../redux/actions/WorkoutAction";

interface Props {
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

    const dispatch = useDispatch();
    const workoutData = useSelector((state: RootStateOrAny) => state.workoutData);

    useEffect(() => {
        console.log("WorkoutApp component did mount");
        dispatch(listWorkouts());
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

    return (
        <div>
            <div>
                {/*<button onClick={() => initialize()}>Get last workout</button>*/}
                {/*<p> Last Workout </p>*/}
                {/*{lastWorkout.exercises.map(exercise => {*/}
                {/*    return (<div key={exercise.name+Math.random()}>*/}
                {/*        Exercise name: {exercise.name}*/}
                {/*    </div>);*/}
                {/*})}*/}

            </div>
            <div key={Math.random()}>
                {tab == Tabs.History &&
                <div>
                    <button onClick={() => backToWorkout()}>Back</button>
                    <button onClick={() => startWorkout()}>Start Workout!</button>
                    {workoutData.workouts.length===0 ?
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
                    {lastWorkout && <WorkoutSummary workout={lastWorkout}>
                    </WorkoutSummary>}
                </div>
                }
            </div>
        </div>

        // <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        //         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        //         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        //         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        //         </DropdownButton>
        //         }
    )
}

export default WorkoutApp;