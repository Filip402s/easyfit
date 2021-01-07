import React, {useState} from 'react';
import WorkoutDay from "./day/WorkoutDay";
import WorkoutHistory from "./history/WorkoutHistory";

interface Props {
}

const Workout: React.FC<Props> = () => {

    const [isWorkout, setIsWorkout] = useState(false);
    const [workoutStartDate, setWorkoutStartDate] = useState<Date>(new Date());
    // const [lastWorkout, setLastWorkout] = useState<SingleWorkout>({exercises: []});

    const initialize = () => {
        setWorkoutStartDate(new Date());
        setIsWorkout(true);
        // fetchLastWorkout().then((response) => {
        //     setLastWorkout(response.data);
        //     response.data.exercises.forEach((exercise) => console.log("Exercise: " + exercise.name));
        // })
    };

    const back = () => {
        setIsWorkout(false);
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
                {!isWorkout &&
                <div>
                    <button onClick={() => initialize()}>Start Workout!</button>
                    <WorkoutHistory/>
                </div>
                }

                {isWorkout &&
                <div>
                    <button onClick={() => back()}>History</button>
                    <WorkoutDay startDate={workoutStartDate}>
                    </WorkoutDay>
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

export default Workout;