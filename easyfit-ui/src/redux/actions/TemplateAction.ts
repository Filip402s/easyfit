import axios from "axios"
import {getTemplatesUrl} from "../../helpers/DomainUrlProvider";

export const listTemplates = () => async (dispatch: any) => {
    try {

        dispatch({
            type: "TEMPLATE_REQUEST"
        });

        const url = getTemplatesUrl();
        const {data} = await axios.get(url);

        dispatch({
            type: "TEMPLATE_SUCCESS",
            payload: data
        })


    } catch (error) {

        dispatch({
            type: "TEMPLATE_FAIL",
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
};
// export const deleteWorkoutsHistory = () => async (dispatch: any) => {
//     try {
//
//         dispatch({
//             type: "TEMPLATES_DELETE_ALL"
//         });
//
//         const url = deleteAllWorkoutsUrl();
//         await axios.delete(url);
//
//     } catch (error) {
//
//         dispatch({
//             type: "WORKOUT_FAIL",
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message
//         })
//
//     }
// }