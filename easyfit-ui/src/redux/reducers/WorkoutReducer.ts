export const workoutReducer = (state = { workouts: [] }, action: any) => {
    switch (action.type) {
        case "WORKOUT_REQUEST":
            return { loading: true, workouts: [] }
        case "WORKOUT_SUCCESS":
            return { loading: false, workouts: action.payload }
        case "WORKOUT_FAIL":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}