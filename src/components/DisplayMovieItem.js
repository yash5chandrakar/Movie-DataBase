import React from 'react'

const DisplayMovieItem = (props) => {
    const item = props.item
    return (
        <div className='displayItem'>
            <div>
                <img src={item.posteurl} alt="Movie_Poster"></img>
            </div>
            <div>
                <h4>{item.title}</h4>
                <p>{item.imdbRating}</p>
            </div>
        </div>
    )
}

export default DisplayMovieItem
