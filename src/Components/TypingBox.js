import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'

import { generate, count } from "random-words";
import UpperComponent from './UpperComponent';
import { useTestMode } from '../Constext/TestModeContext';
import Stats from './Stats';

function TypingBox() {

    //here we creating the two useState
    //1. for the currentWordIndex.
    //2. for the currrntCharIndex.
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currrntCharIndex, setCurrrntCharIndex] = useState(0);

    //creating the two state
    //1. for the test is start or not and second 
    //2. for the test is end or not.
    //due to this state we know the test is start or end.

    const [isTestStart, setIsTestStart] = useState(false);
    const [isTestEnd, setIsTestEnd] = useState(false);


    //now we extract  the timer value in context-api.
    let { testTime } = useTestMode();




    //this couter state for the user click the counter value.
    const [counter, setCounter] = useState(testTime);
    // setCounter(testTime)


    //this state will store the words that generated randomly.
    let [wordArray, setWordArray] = useState(() => {
        let wordCount = generate(60);
        return wordCount;
    })

    //state for storing the intervalId
    //this required in to clear interval 
    const [clearIntervalId, setClearIntervalId] = useState(null)

    //for inncorect characters.
    const [incorrectChars, setIncorrectChars] = useState(0);

    //creating the state for the couting the correct characters.
    let [correctChars, setCorrectChars] = useState(0);

    //for missing characters.
    const [missingChars, setMissingChars] = useState(0);

    //for extra characters.
    const [extraChars, setExtraChars] = useState(0);

    //for correct words.
    const [correcWords, setCorrecWords] = useState(0);

    //here we create to generat the graph-data.
    const [graphData, setGraphData] = useState([]);


    //this below console.log() for testing purpose.
    // console.log(correctChars, incorrectChars, missingChars, extraChars)
    // console.log("correct words", correcWords);

    //here we want each word ref in the wordsArrayRef Array and child inside it which is individula characters.
    const wordsArrayRef = useMemo(() => {
        console.log("words Array", wordArray)
        return Array(wordArray.length).fill(0).map(i => createRef(null));
    }, [wordArray])


    //here we store the refrence of input box using the `useRef` hook.
    let userInput = useRef(null);




    //here we create the function which focusInput which used to focus when the page is load and we not munually 
    //click on the user-input.

    function focusInput() {
        userInput.current.focus();
    }

    //each time page load then we type automatically rather than click on user-input hence we use the 
    //useEffect hook.

    useEffect(() => {
        //this focus on the input box.
        focusInput();

        //this is code when first time user open the website then the cursor is on the start of the word.
        wordsArrayRef[0].current.childNodes[0].className = 'blinking-div'
    }, [])





    //create useEffect when the testTime is changes then we update the counter value by calling the setCounter() 
    //function.

    useEffect(() => {

        resetTest();
    }, [testTime])

    //resetting functionality.

    const resetTest = () => {


        setCounter(testTime);
        setCurrentWordIndex(0);
        setCurrrntCharIndex(0);



        //
        setIsTestStart(false);
        setIsTestEnd(false);


        //focus on words.
        focusInput();

        //word array creating (words see on the screen)
        let temp = generate(60);
        console.log("temp", temp)
        setWordArray(temp);

        wordsArrayRef[0].current.childNodes[0].className = 'blinking-div'

        //reset the test. using interval id.
        clearInterval(clearIntervalId)


        //creating one function that removes the all styling applying on words array.
        resetStyling();

    }

    // function that removes the all styling applying on words array.


    const resetStyling = () => {


        wordsArrayRef.map((i) => {
            Array.from(i.current.childNodes).map((j) => {
                if (j.className.includes("extra")) {
                    j.remove();
                }
                j.className = "char";
            });
        });
        // wordsArrayRef.map(i => {
        //     Array.from(i.current.childNodes).map((j) => {
        //         j.className = '';
        //     })
        // })
        wordsArrayRef[0].current.childNodes[0].className = 'blinking-div'
    }



    //this function handle the user input which type in the input-box.
    function handleKeyDown(e) {

        console.log(isTestEnd, isTestStart);

        if (isTestEnd && isTestEnd) {
            return;
        }
        //if test is end then we return as it is
        // if (isTestEnd == true) {
        //     return;
        // }

        const allcurrentChars = wordsArrayRef[currentWordIndex].current.childNodes;

        if (!isTestStart) {
            setIsTestStart(true);
            TimerFunctinality();

        }


        //if user enter the space then.
        //code is given below.

        if (e.keyCode === 32 && currentWordIndex + 1 < wordArray.length) {

            //to check the correct characters in word.
            let correctCharactersInWord = wordsArrayRef[currentWordIndex].current.querySelectorAll(".green");

            //checking that the correct word or not.
            if (correctCharactersInWord.length == allcurrentChars.length) {
                setCorrecWords(correcWords + 1);
            }
            if (currrntCharIndex < wordArray[currentWordIndex].length) {
                //remove class name for the no multi cursor bliking.
                allcurrentChars[currrntCharIndex].classList.remove('blinking-div');
                wordsArrayRef[currentWordIndex + 1].current.childNodes[0].className = 'blinking-div';

                //this condition for the missed characters.
                //this condition is required to generate result after test is ended.
                //abckdd'cmd' 

                setMissingChars(missingChars + (allcurrentChars.length - currrntCharIndex));

            }
            else {
                //remove the classname which is 'blinking-right
                allcurrentChars[currrntCharIndex - 1].classList.remove('blinking-div');
                allcurrentChars[currrntCharIndex - 1].classList.remove('blinking-right');
                wordsArrayRef[currentWordIndex + 1].current.childNodes[0].className = 'blinking-div';
            }

            //here when we enter the space that means we pointing towards the next word.
            //hence we increment in hook by one.
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrrntCharIndex(0);
            return;
        }

        //if user enter the `BACKSPACE`.

        if (e.keyCode === 8) {
            //code for backspace.

            //this if condition becasue of when we backspace then we don't move to the previous word.
            if (currrntCharIndex !== 0) {

                if (allcurrentChars.length === currrntCharIndex) {
                    if (allcurrentChars[currrntCharIndex - 1].className.includes('extra')) {
                        allcurrentChars[currrntCharIndex - 1].remove();
                        allcurrentChars[currrntCharIndex - 2].className += ' blinking-right'

                    }
                    else {
                        allcurrentChars[currrntCharIndex - 1].className = 'blinking-div'
                    }

                    setCurrrntCharIndex(currrntCharIndex - 1);
                    return;
                }
                allcurrentChars[currrntCharIndex - 1].classList = '';
                if (wordArray[currentWordIndex].length > currrntCharIndex)
                    allcurrentChars[currrntCharIndex].classList.remove('blinking-div');
                allcurrentChars[currrntCharIndex - 1].className = 'blinking-div'
                setCurrrntCharIndex(currrntCharIndex - 1);
                return;
            }

            return;



        }


        //after each word end then their is must user enter the SPACE if user ener the other words then this show in screen in red color
        //which indicates that this is incorrect.
        //condition for the extra characters.
        if (allcurrentChars.length === currrntCharIndex) {
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;

            newSpan.className = 'red blinking-right extra';
            //when we type the extra characters which is incorrect then the cursor moving to the next.
            allcurrentChars[currrntCharIndex - 1].classList.remove('blinking-right')

            wordsArrayRef[currentWordIndex].current.append(newSpan);
            setCurrrntCharIndex(currrntCharIndex + 1)

            //increasing the count of the extra characters.
            //requird for the generating result.
            setExtraChars(extraChars + 1);
            return;

        }


        //if user enter the correct word the text color is GREEN otherwise color is RED.

        if (allcurrentChars.length != currrntCharIndex && e.key == allcurrentChars[currrntCharIndex].innerText) {
            //color of letter is GREEN.
            allcurrentChars[currrntCharIndex].className = 'green';

            //after correct char typing the text color of the char is GREEN otherwise RED.
            //this this code is of the moving to the next word.using we created HOOk.
            setCurrrntCharIndex(currrntCharIndex + 1);

            //if the user enter the correct char then we increat the count of 'correcChar'  using setCorrectChar function.
            setCorrectChars(correctChars + 1);

        }
        else if (allcurrentChars.length != currrntCharIndex) {
            //color of letter is RED.
            allcurrentChars[currrntCharIndex].className = 'red';

            //function to update the incorrect characters.
            setIncorrectChars(incorrectChars + 1);

            //after correct char typing the text color of the char is GREEN otherwise RED.
            //this this code is of the moving to the next word.using we created HOOk.
            setCurrrntCharIndex(currrntCharIndex + 1);

        }


        //if suppose we arrived at the of individual word this is special case in which the we not moving cursor 
        //to the next character ,because their is space after that so that way moving cursor to the right to that
        //word

        if (allcurrentChars.length - 1 == currrntCharIndex) {
            //moving cursor towards right.
            allcurrentChars[currrntCharIndex].classList += ' blinking-right';
        }
        else {

            if (allcurrentChars.length !== currrntCharIndex && currrntCharIndex + 1 !== allcurrentChars.length) {
                allcurrentChars[currrntCharIndex + 1].className = 'blinking-div';
            }
        }

        //Here we check the each word char index is out of bound or not.


    }

    //HERE KEYDOWN FUNCTION END

    //  TIMER FUNCTINALITY
    function TimerFunctinality() {


        const timerId = setInterval(timer, 1000);
        setClearIntervalId(timerId);
        function timer() {
            setCounter((latest) => {

                setCorrectChars((correctChars) => {
                    setGraphData((data) => {
                        return [
                            ...data,
                            [
                                testTime - latest,
                                (correctChars / 5 / ((testTime - latest + 1 / 60)))
                            ]
                        ];
                    });
                    return correctChars;
                });
                if (latest == 1) {
                    setIsTestEnd(true)
                    clearInterval(timerId);
                    return 0;
                }

                return latest - 1;
            });
        }
    }

    //creating the function for retun the WPM. using mathematical formula
    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testTime / 60)); //here to covert the second to min we divided by the 60.
    }

    //creating the function for retun the accuracyof correct word. using mathematical formula
    const calculateAccuracy = () => {
        console.log("correct words", correcWords);
        console.log("incorrec ord", currentWordIndex)
        return (
            Math.round((correcWords / currentWordIndex) * 100)
        )
    }



    return (

        <div className='typing-box-div'>
            <UpperComponent counter={counter} />
            {isTestEnd ? (<Stats wpm={calculateWPM()} accuracy={calculateAccuracy()} correctChars={correctChars} incorrectChars={incorrectChars} missingChars={missingChars} extraChars={extraChars} graphData={graphData} />) : (<div className='outer-typing-div ' onClick={focusInput}>
                <div className='inner-typing-div'>
                    {
                        wordArray.map((word, index) => (
                            <span className='span-inner ' key={index} ref={wordsArrayRef[index]} >
                                {word.split("").map((letter, index) => (
                                    <span key={index}>{letter}</span>
                                ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>)}


            <input
                type='text'
                className='input-div'
                ref={userInput} //this used for the useRef hook.
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default TypingBox