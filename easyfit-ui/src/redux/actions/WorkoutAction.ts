import axios from "axios"
import {getWorkoutUrl} from "../../helpers/DomainUrlProvider";

export const listWorkouts = () => async (dispatch: any) => {
    try {

        dispatch({ 
            type: "WORKOUT_REQUEST"
        })

        const url = getWorkoutUrl();
        const { data } = await axios.get(url);

        dispatch({
            type: "WORKOUT_SUCCESS",
            payload: data
        })

    } catch (error) {

        dispatch({
            type: "WORKOUT_FAIL",
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })

    }
}