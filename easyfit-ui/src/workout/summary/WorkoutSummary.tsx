import React, {useState} from 'react';

import 'react-dropdown/style.css';
import {Workout} from "../history/WorkoutHistory";
import WorkoutHistoryListItem from "./WorkoutHistoryListItem";
import CompactMode from "./CompactMode";

interface Props {
    workout: Workout;
}

const WorkoutSummary: React.FC<Props> = ({workout}) => {

    const [compactMode, setCompactMode] = useState<boolean>(false);

    const enableCompactMode = () => {
        setCompactMode(!compactMode);
    }

    return (
        <div>
            <span>Finished</span>
            <button onClick={enableCompactMode}>Compact mode</button>
            {compactMode ?
                <CompactMode workout={workout}/> :
                <WorkoutHistoryListItem workout={workout}/>
            }
        </div>
    );

}

export default WorkoutSummary;