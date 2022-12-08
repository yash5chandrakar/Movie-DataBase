import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "./AddItems.module.css"
import { useParams } from 'react-router-dom'

const AddMovies = (props) => {
    const params = useParams()

    // console.log(params)
    const username = props.username
    const isLoggedIn = props.isLoggedIn

    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("")
    const [year, setYear] = useState("")
    const [desc, setDesc] = useState("")
    const [posteurl, setPosterUrl] = useState("")
    const [highlights1, setHighlights1] = useState("")
    const [highlights2, setHighlights2] = useState("")
    const [highlights3, setHighlights3] = useState("")
    const [highlights4, setHighlights4] = useState("")

    useEffect(() => {
        if (params !== null) {
            axios.get(`http://localhost:3001/api/getSingleUser?id=${username}`).then((response) => {
                let myData = response.data.items
                // console.log(params.id)
                for (let i = 0; i < myData.length; i++) {
                    if (myData[i].id === parseInt(params.id)) {
                        // console.log("hello")
                        setTitle(myData[i].title)
                        setRating(myData[i].imdbRating)
                        setDesc(myData[i].storyline)
                        setHighlights1(myData[i].genres[0])
                        setHighlights2(myData[i].genres[1])
                        setHighlights3(myData[i].genres[2])
                        setHighlights4(myData[i].genres[3])
                        setYear(myData[i].year)
                        setPosterUrl(myData[i].posteurl)
                        return
                    }
                }
            })
        }
    }, [params, username])



    if (!isLoggedIn) {
        return (
            <div className='outerDiv'>
                <div className='innerDiv'>
                    <h1>Need to be logged in to access this page.</h1>
                </div>
            </div>
        )
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.get(`http://localhost:3001/api/getSingleUser?id=${username}`).then((response) => {
            let myData = response.data.items
            let myObj = {
                id: new Date().getTime(),
                title: title,
                year: year,
                storyline: desc,
                imdbRating: rating,
                genres: [highlights1, highlights2, highlights3, highlights4],
                posteurl: posteurl
            }
            myData.push(myObj)
            axios.post("http://localhost:3001/api/updateUser", {
                username: username,
                data: myData
            })
                .then((resp) => {
                    console.log(resp)
                    alert("Data Added Successfully !")
                    setDesc("")
                    setHighlights1("")
                    setHighlights2("")
                    setHighlights3("")
                    setHighlights4("")
                    setRating("")
                    setPosterUrl("")
                    setYear("")
                    setTitle("")
                })
                .catch((err) => {
                    console.log(err)
                    alert("Error! Try Again")
                }
                )
        })


        // })
    }

    return (
        <div className={styles.container}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1>Add an Item</h1><br />
                <p>You can add and edit your movie details </p><br />
                <div className={styles.row}>
                    <div >
                        <label htmlFor='title' >Title : </label>
                    </div>
                    <div >
                        <input value={title} type={'text'} required onChange={(e) => setTitle(e.target.value)} placeholder="Enter Movie Name" /> <br />
                    </div>
                </div>
                <div className={styles.row}>
                    <div >
                        <label htmlFor='rating'>Rating : </label>
                    </div>
                    <div >
                        <input value={rating} type={'text'} required onChange={(e) => setRating(e.target.value)} placeholder="Enter Movie rating" /> <br />
                    </div>
                </div>
                <div className={styles.row}>
                    <div >
                        <label htmlFor='year'>Year : </label>
                    </div>
                    <div >
                        <input value={year} type={'text'} required onChange={(e) => setYear(e.target.value)} placeholder="Enter Year" /> <br />
                    </div>
                </div>
                <div className={styles.row}>
                    <div >
                        <label htmlFor='genres'>Genres : </label>
                    </div>
                    <div >
                        <input value={highlights1} type={'text'} required onChange={(e) => setHighlights1(e.target.value)} placeholder="Enter Genre 1" />
                        <input value={highlights2} type={'text'} onChange={(e) => setHighlights2(e.target.value)} placeholder="Enter Genre 2" /> <br />
                        <input value={highlights3} type={'text'} onChange={(e) => setHighlights3(e.target.value)} placeholder="Enter Genre 3" />
                        <input value={highlights4} type={'text'} onChange={(e) => setHighlights4(e.target.value)} placeholder="Enter Genre 4" /> <br />
                    </div>
                </div>
                <div className={styles.row}>
                    <div >
                        <label htmlFor='desc'>Description (Short) : </label>
                    </div>
                    <div >
                        <textarea type={'text'} required onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Enter Movie Description" /> <br />
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <label htmlFor='imageUrl'>Poster Url: </label>
                    </div>
                    <div >
                        <input type={'text'} value={posteurl} onChange={(e) => setPosterUrl(e.target.value)} placeholder="Enter Image URL" required /> <br />
                    </div>
                </div>
                <div className={styles.submitBtn}>
                    <input type={'submit'} value="Submit" required />
                </div>
            </form>
        </div>
    )
}

export default AddMovies
