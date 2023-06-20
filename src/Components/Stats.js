import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../firebaseConfig'
import { toast } from 'react-toastify'

const Stats = ({
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    missingChars,
    extraChars,
    graphData
}) => {


    //function to push the data into the database.
    const pushDataToDB = () => {

        if (isNaN(accuracy)) {
            toast.warning('invalid test (NaN error)', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        const resultRef = db.collection("Result");
        const { uid } = auth.currentUser;
        resultRef.add({
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            chracters: `${correctChars}/ ${incorrectChars}/ ${missingChars}/ ${extraChars}`,
            userId: uid
        }).then((res) => {
            toast.sucess('data saved to database', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch((err) => {
            toast.warning('data not saved to database', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }

    //using useEffect .
    useEffect(() => {
        if (auth.currentUser) {
            pushDataToDB();
        }
        else {
            toast.warning('login to push data into the database', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [])

    return (
        <div className='stat-div'>
            <div className='left-stat-div'>
                <div className='title'>WPM</div>
                <div className='subtitle'>{wpm}</div>
                <div className='title'>Accuracy</div>
                <div className='subtitle'>{accuracy}</div>
                <div className='title'>Characters</div>
                <div className='subtitle'>{correctChars}/ {incorrectChars}/ {missingChars}/ {extraChars}</div>
            </div>
            <div className='right-stat-div'>
                {/* /using graph componene to show the output through graph. */}
                <Graph graphData={graphData} />
            </div>
        </div>
    )
}

export default Stats