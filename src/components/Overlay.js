import React from 'react'

const Overlay = (props) => {
    const item = props.chosenItem
    const setModal = props.setModal

    if (item === "") {
        return null
    }
    let id = 0;

    return (
        <div className='overlayModal'>
            <div className='modeLeft'>
                <img src={item.posterurl} alt="Movie_Poster"></img>
            </div>
            <div className='modeRight'>
                <h1>{item.title} </h1>
                <p className='ratings'>IMDB Rating : {item.imdbRating} 📽 Year : {item.year}</p>
                <p className='genres'>{item.genres.map((element) => {
                    return <span key={id++}>{element} &nbsp;</span>
                })}
                </p>
                <p>{item.storyline}</p>
            </div>
            <div ><button onClick={() => setModal(false)}>X</button></div>
        </div>
    )
}

export default Overlay
