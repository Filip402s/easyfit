import React, {useState} from 'react';
import Dropdown from "react-dropdown";
import DebugInfo from "./DebugInfo";

interface Props {
    onAddExercise: any;
}

interface Exercise {
    id: number;
    name: string;
}

const AddExerciseSection: React.FC<Props> = ({onAddExercise}) => {

    const exercises: Exercise[] = [{id: 1, name: "Deadlift"}, {id: 2, name: "Bench press"},
        {id: 3, name: "Pullups"}, {id: 4, name: "Rows"}, {id: 5, name: "Squats"}, {id: 6, name: "Overhead press"},
        {id: 7, name: "Bicep curl"}, {id: 8, name: "Lat raise"}, {id: 9, name: "Skullcrushers"},
        {id: 10, name: "Dips"}, {id: 11, name: "Ab crunches"}];
    const exerciseOptions = exercises.map(exercise => exercise.name);
    const weightOptions = ['None', '3', '5', '6', '7', '8', '10', '20', '30', '40', '50', '60', '65', '67,5', '70', '72,5', '75', '77,5', '80', '82,5', '85', '90', '100', '110', '120', '130', '140', '150'];
    const repsOptions = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];

    const [selectedExercise, setSelectedExercise] = useState<string>("Bench press");
    const [selectedWeight, setSelectedWeight] = useState<string>('20');
    const [selectedReps, setSelectedReps] = useState<string>('6');

    const addExercise = () => {
        const selectedExercise = getSelectedExercise();
        onAddExercise(selectedExercise);
    }

    const getSelectedExercise = () => {
        const exercise: Exercise = exercises.find(e => e.name === selectedExercise) || exercises[0];
        if (exercise !== undefined) {
            console.log('Selected exercise: ' + JSON.stringify(exercise));
            console.log(exercise);
            return {
                exerciseId: exercise.id,
                exerciseName: exercise.name,
                weight: selectedWeight,
                reps: +selectedReps
            };
        } else {
            console.error("[AddExerciseSection#addExercise] Error when trying to get selected exercise")
            return null;
        }
    }

    const onExerciseChange = (event: any) => {
        setSelectedExercise(event.value);
        console.log("selected exercise:" + event.value);
    }

    const onWeightChange = (event: any) => {
        setSelectedWeight(event.value);
    }

    const onRepsChange = (event: any) => {
        console.log("selected reps: " + event.value);
        setSelectedReps(event.value);
    }

    const getExerciseInfo = () => {
        return {
            selectedExercise: selectedExercise,
            selectedWeight: selectedWeight,
            selectedReps: selectedReps
        };
    }

    return (
        <div>
            <DebugInfo exerciseInfo={getExerciseInfo()}/>

            <div>
                <Dropdown options={exerciseOptions} onChange={onExerciseChange} value={selectedExercise}
                          placeholder="Exercise"/>
                {/*<button onClick={() => onExerciseChangeButton('Bench press')}>Bench press</button>*/}
            </div>
            <div>
                <span>Weight:</span>
                <Dropdown options={weightOptions} onChange={onWeightChange} value={selectedWeight}
                          placeholder="Weight"/>
                {/*<button onClick={() => onWeightChangeButton('60')}>60</button>*/}
            </div>
            <div>
                <span>Reps:</span>
                <Dropdown options={repsOptions} onChange={onRepsChange} value={selectedReps} placeholder="Reps"/>
                {/*<button onClick={() => onRepsChangeButton('6')}>6</button>*/}
            </div>
            <button onClick={addExercise}>Add exercise</button>
        </div>
    )
}

export default AddExerciseSection;