import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {workoutReducer} from "./reducers/WorkoutReducer";
import {templateReducer} from "./reducers/TemplateReducer";

const reducer = combineReducers({
    workoutData: workoutReducer,
    templates: templateReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;