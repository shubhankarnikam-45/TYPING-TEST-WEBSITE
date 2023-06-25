import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableUserData from '../Components/TableUserData';
import Graph from '../Components/Graph';
import UserInfo from '../Components/UserInfo';

const UserPage = () => {

    //to know the firebase is loading or not. and also we get the current user.
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
        //using this we get data from the database. 
        const resultsRef = db.collection("Result");
        //here we getting the current user bcoz when we according to user-id,of logged.
        //user we fetch the data in user page.
        //here due to snapshot we get the all data to filter we want [uid]
        const { uid } = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        //there get() Fn is used to the 'data' that is 'snapshots' from the DB
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
        //if user is not logged in. then we navigate to the "home page"
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