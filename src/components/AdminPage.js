import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminPage = (props) => {
    const username = props.username
    const isLoggedIn = props.isLoggedIn
    const isAdmin = props.isAdmin
    const setIsAdmin = props.setIsAdmin
    useEffect(() => {
        axios.get(`http://localhost:3001/api/getSingleUser?id=${username}`).then((response) => {
            let userData = response.data
            if (userData.admin) {
                setIsAdmin(true)
            }
        })
    }, [setIsAdmin, username])


    if (!isLoggedIn) {
        return (
            <div className='outerDiv'>
                <div className='innerDiv'>
                    <h1>Need to be logged in to access this page.</h1>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return (
            <div className='outerDiv'>
                <div className='innerDiv'>
                    <h1>Only Admins can access this page.</h1>
                </div>
            </div>
        )
    }

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                <div className='welcomePage'>
                    <h2>Welcome <span className='username'>{username}</span> <hr /></h2>
                    <div className='welcomeOptions'>
                        <h3>Go To :-</h3>
                        <ul>
                            <li><Link to={"/adminPage/users"}>1.See All Users</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminPage
