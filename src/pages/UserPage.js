import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {

    //to know the firebase is loading or not.
    const [user, loading] = useAuthState(auth);

    //for graph data
    const [graphData, setGraphData] = useState([]);

    //creating state to store the data.
    const [data, setData] = useState([]);

    //loading 
    const [dataLoading, setDataLoading] = useState(true);

    // for navigage
    const navigate = useNavigate();
    //creting one function to fetchData.
    function fetchData() {
        const resultsRef = db.collection("Result");
        const { uid } = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultsRef.where('userId', '==', uid)
            .orderBy('timeStamp', 'desc')
            .get().then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    tempData.push({ ...doc.data() });
                    tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(",")[0], doc.data().wpm])
                });
                setData(tempData);
                setGraphData(tempGraphData.reverse());
                setDataLoading(false);
            })
    }

    //calling the `fetchData()` function in `useEffect`
    useEffect(() => {
        if (!loading) {
            fetchData();
        }
        if (!loading && !user) {
            navigate('/');
        }
    }, [loading])

    if (loading || dataLoading) {
        return <div className='center-of-screen'>
            <CircularProgress size={300} />
        </div>
    }

    return (
        <div className='grid-box'>
            <div className='inner-grid'>
                <UserInfo totalTestTaken={data.length} />
                <Graph graphData={graphData} />
                <TableUserData data={data} />
            </div>

        </div>
    )
}

export default UserPage