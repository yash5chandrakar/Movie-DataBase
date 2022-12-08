import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = (props) => {
    const [render, setRender] = useState("")
    const [myData, setMyData] = useState([])
    const username = props.username
    const isLoggedIn = props.isLoggedIn
    const isAdmin = props.isAdmin

    useEffect(() => {
        axios.get(`http://localhost:3001/api/getUsers`).then((response) => {
            let arr = response.data
            setMyData(arr)
            // console.log(arr)
        })
    }, [render])

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

    function handleEdit(email, value) {
        if (email === username) {
            alert("Error! Cannot remove admin privilege !")
        }
        else {
            axios.post("http://localhost:3001/api/updateUserPrivelege", {
                email: email,
                admin: !value
            }).then((resp) => {
                alert("Role Change SuccessFul !")
                // console.log(resp)
            }).catch((err) => console.log(err))
            setRender(new Date().getTime())
        }
    }

    let id = 1;

    return (
        <div className='outerDiv'>
            <div className='innerDiv'>
                <div className='showMovieDiv'>
                    <div className='userContent'>
                        <table className='movieTable'>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Email/Name</th>
                                    <th>Admin</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                {myData && myData.map((item) => {
                                    return <tr key={id}>
                                        <td>{id++}</td>
                                        <td>{item.email}</td>
                                        <td>{JSON.stringify(item.admin)}</td>
                                        <td><button onClick={() => handleEdit(item.email, item.admin)}>Change Role</button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
