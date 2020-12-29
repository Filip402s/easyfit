import React, {useState} from 'react';

interface Props {
    exerciseInfo: any;
}

const DebugInfo: React.FC<Props> = ({exerciseInfo}) => {

    const [debugMode, setDebugMode] = useState<boolean>(false);

    const handleDebugModeChange = () => {
        const newDebugMode = !debugMode;
        setDebugMode(newDebugMode);
    }

    const debugModeCheckbox = () => {
        return <input name="debugMode"
                      type="checkbox"
                      checked={debugMode}
                      onChange={handleDebugModeChange}/>;
    }

    const debugModeData = () => {
        return <>
            <div>
                {exerciseInfo.selectedExercise && <div>
                    <div>Exercise: {exerciseInfo.selectedExercise}</div>
                </div>}
                {exerciseInfo.selectedWeight && <div>
                    <div>Weight: {exerciseInfo.selectedWeight}</div>
                </div>}
                {exerciseInfo.selectedReps && <div>
                    <div>Reps: {exerciseInfo.selectedReps}</div>
                </div>}
            </div>
        </>;
    }

    return (
        <>
            <div> {debugModeCheckbox()} </div>
            {debugMode &&
            <div> {debugModeData()} </div>}
        </>
    )
}

export default DebugInfo;