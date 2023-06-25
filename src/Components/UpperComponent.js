import React from 'react'
import { useTestMode } from '../Constext/TestModeContext'
const UpperComponent = ({ counter }) => {

    let { setTestTime } = useTestMode();

    let { testTime } = useTestMode();
    function handleClick(e) {
        console.log(testTime)
        console.log("ie", e.target.id)

        if (testTime === e.target.id) {
            setTestTime(Math.round(+e.target.id + 0.4));
        }
        else {
            setTestTime(e.target.id);
        }



    }
    return (
        <div className='counter-container'>
            <div className='counter-div'>
                <div>{counter}</div>
            </div>
            <div className='outer-container-timer'>
                <div className='inner-div' id={15} onClick={handleClick}>15s</div>
                <div className='inner-div' id={30} onClick={handleClick}>30s</div>
                <div className='inner-div' id={60} onClick={handleClick}>60s</div>
            </div>
        </div>
    )
}

export default UpperComponent