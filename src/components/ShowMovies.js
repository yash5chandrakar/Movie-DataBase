import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ShowMovies = (props) => {
    const username = props.username
    const navigate = useNavigate();
    const [myData, setMyData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/getSingleUser?id=${username}`).then((response) => {
            let arr = response.data.items
            setMyData(arr)
        })
    })


    function handleDelete(itemId) {
        axios.get(`http://localhost:3001/api/getSingleUser?id=${username}`).then((response) => {
            let arr = response.data.items
            arr = arr.filter((item) => {
                return item.id !== itemId
            })
            // console.log(arr)
            axios.post("http://localhost:3001/api/updateUser", {
                username: username,
                data: arr
            }).then((resp) => {
                console.log(resp)
                alert("Entry Deleted Successfully")
            })
                .catch((err) => {
                    console.log(err)
                })
        })
    }

    function handleEdit(itemId) {
        navigate(`/mymovies/addMovies/${itemId}`)
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
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Rating</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myData && myData.map((item) => {
                                    return <tr key={id}>
                                        <td>{id++}</td>
                                        <td>{item.title}</td>
                                        <td>{item.year}</td>
                                        <td>{item.imdbRating}</td>
                                        <td><button onClick={() => handleEdit(item.id)}>Edit</button></td>
                                        <td><button onClick={() => handleDelete(item.id)}>X</button></td>
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

export default ShowMovies
