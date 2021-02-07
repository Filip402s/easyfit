import React from 'react';
import {getFormattedTime, getFormattedDate, getFormattedDateTime} from "../../../helpers/DateFormatter";

interface Props {
    startDate: Date;
}

const WorkoutInfo: React.FC<Props> = ({startDate}) => {

    return (
        <div>
            <span>Started on: {getFormattedDateTime(startDate)}</span>
        </div>
    )
}
export default WorkoutInfo;