import React, { useEffect, useState } from 'react'
import axios from "axios";
import DisplayItem from './DisplayItem'
import Overlay from './Overlay';
const HomePage = () => {
    const [movies, setMovies] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const [genre, setGenre] = useState("")
    const [chosenItem, setChosenItem] = useState("")
    const [sort, setSort] = useState("LATEST")
    const [genreIndex, setGenreindex] = useState(0)
    const [totalMovies, setTotalMovies] = useState(0)
    const baseURL = "http://localhost:3001/api/getItems"
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {

    }, [genre, pageNo, query])


    useEffect(() => {
        axios.get(baseURL).then((response) => {
            let myData = response.data

            if (genre !== "") {
                // eslint-disable-next-line array-callback-return
                myData = myData.filter((item) => {
                    let arr = item.genres
                    // console.log(arr)
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === genre) {
                            return item
                        }
                    }
                })
            }
            setTotalMovies(myData.length)
            myData = myData.slice((pageNo - 1) * 20, (pageNo) * 20)

            if (sort === "LATEST") {
                myData = myData.sort((a, b) => b.year - a.year)
            }
            else if (sort === "OLDEST") {
                myData = myData.sort((a, b) => a.year - b.year)
            }
            else if (sort === "RATINGUP") {
                myData = myData.sort((a, b) => b.imdbRating - a.imdbRating)
            }
            else if (sort === "RATINGDOWN") {
                myData = myData.sort((a, b) => a.imdbRating - b.imdbRating)
            }
            if (query !== "") {
                console.log("Hello")
                // eslint-disable-next-line array-callback-return
                myData = myData.filter((item) => {
                    if (item.title.includes(query)) {
                        return item;
                    }

                })

            }
            if (myData.length === 0) {
                setPageNo(1)
            }
            setMovies(myData)

            // setMovies(response.data)
        });
    }, [genre, pageNo, query, sort])

    useEffect(() => {
        let elements = document.getElementsByTagName("li")
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("selectedGenre")
        }
        elements[genreIndex].classList.add("selectedGenre")
        setPageNo(1)
    }, [genreIndex])


    function incrementPage() {
        if (pageNo !== totalMovies / 20) {
            setPageNo(pageNo + 1)
        }
    }



    function decrementPage() {
        if (pageNo !== 1) {
            setPageNo(pageNo - 1)
        }
    }
    return (
        <div className='homepage'>
            {modal ? <div style={{ display: modal }} className='modal'>
                <div className='overlay'>
                    <Overlay setModal={setModal} chosenItem={chosenItem} />
                </div>
            </div> : ""}
            <h1 className='heading'>Home-Page</h1>
            <div className='homeContent'>
                <div className='leftHome'>
                    <h3>GENRES <hr /></h3>
                    <ul>
                        <li onClick={() => { setGenre(""); setGenreindex(0) }}>All</li>
                        <li onClick={() => { setGenre("Action"); setGenreindex(1) }}>Action</li>
                        <li onClick={() => { setGenre("Adventure"); setGenreindex(2) }}>Adventure</li>
                        <li onClick={() => { setGenre("Biography"); setGenreindex(3) }}>Biography</li>
                        <li onClick={() => { setGenre("Comedy"); setGenreindex(4) }}>Comedy</li>
                        <li onClick={() => { setGenre("Crime"); setGenreindex(5) }}>Crime</li>
                        <li onClick={() => { setGenre("Drama"); setGenreindex(6) }}>Drama</li>
                        <li onClick={() => { setGenre("History"); setGenreindex(7) }}>History</li>
                        <li onClick={() => { setGenre("Romance"); setGenreindex(8) }}>Romance</li>
                        <li onClick={() => { setGenre("Mystery"); setGenreindex(9) }}>Mystery</li>
                        <li onClick={() => { setGenre("Horror"); setGenreindex(10) }}>Horror</li>
                        <li onClick={() => { setGenre("Fantasy"); setGenreindex(11) }}>Fantasy</li>
                        <li onClick={() => { setGenre("Thriller"); setGenreindex(12) }}>Thriller</li>
                    </ul>
                </div>
                <div className='rightHome'>
                    <div className='upperHome'>
                        <h3>{totalMovies} Movies</h3>
                        <div><input placeholder='Search For a movie..' value={query} onChange={(e) => setQuery(e.target.value)}></input> &nbsp; </div>
                        <div><button onClick={() => decrementPage()}>👈🏻</button> {pageNo} <button onClick={() => incrementPage()}>👉🏻</button></div>
                        <div>SORT BY : <select onChange={(e) => setSort(e.target.value)} name='sort' id='sort'>
                            <option value="LATEST">LATEST</option>
                            <option value="OLDEST">OLDEST</option>
                            <option value="RATINGUP">HIGHEST RATED</option>
                            <option value="RATINGDOWN">LOWEST RATED</option>
                        </select>
                        </div>
                    </div>
                    <div className='displayContent'>
                        {movies && movies.map((item) => {
                            return <DisplayItem setModal={setModal} setChosenItem={setChosenItem} key={item.poster} item={item} />
                        })}
                    </div>
                    <div className='navigatePage'><button onClick={() => decrementPage()}>👈🏻</button> {pageNo} <button onClick={() => incrementPage()}>👉🏻</button></div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
