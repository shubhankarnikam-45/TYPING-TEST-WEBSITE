import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

const UserInfo = ({ totalTestTaken }) => {

    const [user] = useAuthState(auth);
    return (
        <div className='user-info'>
            <div className='user'>
                <div className='logo'>
                    <AccountCircleIcon
                        style={{
                            display: 'block',
                            transform: "scale(5)",
                            margin: "auto",
                            marginTop: '5.5rem'
                        }}
                    />
                </div>

                <div className='info'>
                    <div className='email'>
                        {user.email}
                    </div>
                    <div className='jointed-to'>
                        {user.metadata.creationTime}
                    </div>
                </div>
            </div>

            <div className='total-tests'>
                <span>Total Test Taken: {totalTestTaken}</span>
            </div>
        </div>
    )
}

export default UserInfo