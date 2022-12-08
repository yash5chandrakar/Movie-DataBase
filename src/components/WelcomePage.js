import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = (props) => {
    const username = props.username
    console.log(username)
    return (
        <div className='welcomePage'>
            <h2>Welcome <span className='username'>{username}</span> <hr /></h2>
            <div className='welcomeOptions'>
                <h3>Go To :-</h3>
                <ul>
                    <li><Link to={"/home"}>1. HomePage</Link></li>
                    <li><Link to={"/mymovies"}>2. Mymovies</Link></li>
                    <li><Link to={"/adminPage"}>3. AdminPage</Link></li>
                </ul>
            </div>
        </div>

    )
}

export default WelcomePage
