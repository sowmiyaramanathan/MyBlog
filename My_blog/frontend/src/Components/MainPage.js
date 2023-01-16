import React from 'react';
import { Link } from 'react-router-dom';

function MainPage (props) {
    return (
        <div>
            <p>New User</p>
            <Link to='/signup'> <button>Sign Up</button> </Link>
            <br/>
            <p>Existing user</p>
            <Link to='/signin'> <button>Sign In</button> </Link>
        </div>
    )
}

export default MainPage;