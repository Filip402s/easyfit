import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import WorkoutDay, {ExerciseDataListElement} from "./day/WorkoutDay";
import WorkoutHistory, {Workout} from "./history/WorkoutHistory";
import WorkoutSummary from "./summary/WorkoutSummary";
import {getShareUrl} from "../helpers/DomainUrlProvider";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {listWorkouts} from "../redux/actions/WorkoutAction";

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
    const [shareInfo, setShareInfo] = useState<string>("");
    const [shareUrl, setShareUrl] = useState<string>("");

    const clearShareInfo = () => {
        setShareUrl("");
        setShareInfo("");
    }

    const dispatch = useDispatch();
    const workoutData = useSelector((state: RootStateOrAny) => state.workoutData);

    useEffect(() => {
        console.log("WorkoutApp component did mount");
        dispatch(listWorkouts());
    }, [dispatch]);

    const startWorkout = () => {
        setWorkoutStartDate(new Date());
        setTab(Tabs.WorkoutDay);
        clearShareInfo();
        // fetchLastWorkout().then((response) => {
        //     setLastWorkout(response.data);
        //     response.data.exercises.forEach((exercise) => console.log("Exercise: " + exercise.name));
        // })
    };

    const share = () => {
        if (lastWorkout !== undefined) {
            setShareUrl("");
            setShareInfo("sharing...");
            const axios = require('axios');

            const url = getShareUrl(lastWorkout.id);
            console.log("Sharing workout. Sending http POST " + url);

            axios.post(url)
                .then(function (response: any) {
                    console.log(response);
                    console.log(response.request.response);
                    setShareUrl("https://twitter.com/mazakk94/status/" + response.request.response);
                    setShareInfo('shared!');
                })
                .catch(function (error: any) {
                    setShareInfo("sharing failed");
                    setShareUrl("");
                    console.log(error);
                })
                .then(function () {
                    console.log("Finished sharing.");
                });
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

    return (
        <div>
            <div key={Math.random()}>
                {tab == Tabs.History &&
                <div>
                    <button onClick={() => startWorkout()}>Start Workout!</button>
                    <WorkoutHistory workoutData={workoutData}/>
                    <Button>I'm purple.</Button>
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
                    <br/>
                    <button onClick={() => share()}>Share</button>
                    <br/>
                    <span>
                        {shareInfo}<br/>
                        {shareUrl.length > 0 && <a href={shareUrl}>{shareUrl}</a>}
                    </span>


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