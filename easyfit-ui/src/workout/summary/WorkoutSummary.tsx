import React from 'react';

import 'react-dropdown/style.css';
import {Workout} from "../history/WorkoutHistory";
import WorkoutHistoryListItem from "./WorkoutHistoryListItem";

interface Props {
    workout: Workout;
}

const WorkoutSummary: React.FC<Props> = ({workout}) => {

    return (
        <div>
            <span>Finished</span>
            <WorkoutHistoryListItem workout={workout}/>
        </div>
    );

}

export default WorkoutSummary;