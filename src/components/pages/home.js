import React, {useEffect, useState} from 'react'
import AddBook from '../pages/add-book'
import Book from './book'
import axios from 'axios'
import Cookies from 'js-cookie'

function Home(props) {
    const[allBooks, setAllBooks] = useState([])
    const[bookToEdit, setBookToEdit] = useState({})
    const[editMode, setEditMode] = useState(false)

    useEffect(() => {
        getAllBooks()

    }, [])

    const getAllBooks = () => {
        axios.get('http://localhost:5000/books')
        .then(response => {
            console.log(response);
            setAllBooks(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const handleEditClick = book => {
        setBookToEdit(book)
        setEditMode(true)
    }

    const handleEditSubmit = () => {
        setEditMode(false)
        getAllBooks()
    }

    const renderBooks = () => {
        const books = allBooks.map(book => {
            return <Book key={book.id} handleEditClick={handleEditClick} book={book} />
        })
        return books
    }

    return (
        <div className="home-container">
            <h3>Welcome {props.loggedIn ? Cookies.get('username') : ''}</h3>
            <div>{editMode ? <AddBook book={bookToEdit} edit={editMode} request={'update'} handleEditSubmit={handleEditSubmit} /> : renderBooks()}</div>
        </div>
    )
}

export default Home