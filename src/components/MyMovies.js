import React from 'react'
import { Link } from 'react-router-dom'

const MyMovies = (props) => {
    const isLoggedIn = props.isLoggedIn
    const username = props.username
    if (!isLoggedIn) {
        return (
            <div className='outerDiv'>
                <div className='innerDiv'>
                    <h1>Need to be logged in to access this page.</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                <div className='dashboardMyMovies'>
                    <h2>Hello, {username}</h2>
                    <div className='dashboardContent'>
                        <ul className='dashLinks'>
                            <li><Link to="/mymovies/dashboard">See Your Collection</Link></li>
                            <li><Link to="/mymovies/addMovies">Add New Movies</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMovies
