
import React from 'react'

function Book(props) {
    const {id, title, author, review, genre, price} = props.book
    return (
        <div className="book">
            <h1>{title}</h1>
            <h2>{author}</h2>
            <p>{review}</p>
            <p>{genre}</p>
            <p>{price}</p>
            <button onClick={() => props.handleEditClick(props.book)}>Edit</button>
        </div>
    )
}

export default Book
