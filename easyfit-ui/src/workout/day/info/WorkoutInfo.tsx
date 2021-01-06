import React from 'react';
import {getFormattedTime, getFormattedDate} from "../../../helpers/DateFormatter";

interface Props {
    startDate: Date;
}

const WorkoutInfo: React.FC<Props> = ({startDate}) => {

    return (
        <div>
            <span>Started on: {getFormattedDate(startDate)} at {getFormattedTime(startDate)}</span>
        </div>
    )
}
export default WorkoutInfo;