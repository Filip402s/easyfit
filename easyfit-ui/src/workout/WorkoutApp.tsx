import React, {useState} from 'react';
import WorkoutDay from "./day/WorkoutDay";
import WorkoutHistory, {Workout} from "./history/WorkoutHistory";
import WorkoutSummary from "./summary/WorkoutSummary";

interface Props {
}

enum Tabs {
    History,
    WorkoutDay,
    Summary
}

const WorkoutApp: React.FC<Props> = () => {

    const [tab, setTab] = useState(Tabs.History);
    const [workoutStartDate, setWorkoutStartDate] = useState<Date>(new Date());
    const [lastWorkout, setLastWorkout] = useState<Workout>();

    const startWorkout = () => {
        setWorkoutStartDate(new Date());
        setTab(Tabs.WorkoutDay);
        // fetchLastWorkout().then((response) => {
        //     setLastWorkout(response.data);
        //     response.data.exercises.forEach((exercise) => console.log("Exercise: " + exercise.name));
        // })
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
                    <button onClick={() => startWorkout()}>Start Workout!</button>
                    <WorkoutHistory/>
                </div>
                }
                {tab == Tabs.WorkoutDay &&
                <div>
                    <button onClick={() => openHistoryTab()}>History</button>
                    <WorkoutDay startDate={workoutStartDate} onSuccess={onWorkoutSaveSuccess}>
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