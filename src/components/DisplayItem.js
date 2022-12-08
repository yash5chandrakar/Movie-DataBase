import React from 'react'


const DisplayItem = (props) => {
    const item = props.item
    const setModal = props.setModal
    const setChosenItem = props.setChosenItem

    const toggleModal = () => {
        // console.log("Hello")
        setModal(true)
        setChosenItem(item)
    }

    return (
        <div onClick={toggleModal} className='displayItem'>
            <div>
                <img src={item.posterurl} alt="Movie_Poster"></img>
            </div>
            <div>
                <h4>{item.title}</h4>
                <p>{item.imdbRating}</p>
            </div>
        </div>
    )
}

export default DisplayItem
