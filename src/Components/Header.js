import React from 'react'
import CircularLogo from './CircularLogo'

const Header = () => {

    return (
        <div className='header'>
            <div className='logo'>
                LOGO
            </div>
            <div className='user-icon'>
                <CircularLogo />
            </div>
        </div>
    )
}

export default Header