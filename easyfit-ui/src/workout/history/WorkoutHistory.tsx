import React, {useEffect, useState} from "react";
import {getWorkoutUrl} from "../../helpers/DomainUrlProvider";

interface Props {
}

const WorkoutHistory: React.FC<Props> = () => {

    const [workouts, setWorkouts] = useState<string>("");

    useEffect(() => {
        init();
    }, []);

    function init() {
        const axios = require('axios');

        const url = getWorkoutUrl();
        console.log("Workout history. Calling http GET " + url);

        axios.get(url)
            .then(function (response: any) {
                console.log("Response from history endpoint: ");
                console.log(response);
                const history = JSON.stringify(response.data);
                setWorkouts(history);
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("Finished getting history.");
            });
    }

    return (
        <div>
            Workouts: {workouts}<br/>
        </div>
    )
}

export default WorkoutHistory;