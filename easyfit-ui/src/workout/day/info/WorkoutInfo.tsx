import React from 'react';
import {getFormattedDate} from "./DateFormatter";

interface Props {
    startDate: Date;
}

const WorkoutInfo: React.FC<Props> = ({startDate}) => {

    return (
        <div>
            <span>Workout started at:<br/>{getFormattedDate(startDate)}</span>
        </div>
    )

}
export default WorkoutInfo;