import React, {useState, useEffect} from 'react'

function AddBook(props) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [review, setReview] = useState('')
    const [genre, setGenre] = useState('')
    const [price, setPrice] = useState('')
    const [requestType, setRequestType] = useState(props.request)
    const [request, setRequest] = useState('')
    const [bookToEdit, setBookToEdit] = useState(props.book)
    const [endPoint, setEndPoint] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        fetch(endPoint, {
            method: request,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                author: author,
                review: review,
                genre: genre,
                price: price
            })
        }).then(response => {
            if(props.edit === true) {
                props.handleEditSubmit()
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(requestType === 'add') {
            setEndPoint('http://localhost:5000/book');
            setRequest('POST')
        } else if(requestType === 'update') {
            setEndPoint(`http://localhost:5000/book/${bookToEdit.id}`)
            setRequest('PUT')

            if(bookToEdit) {
                setTitle(bookToEdit.title)
                setAuthor(bookToEdit.author)
                setReview(bookToEdit.review)
                setGenre(bookToEdit.genre)
                setPrice(bookToEdit.price)
            }
        }
    }, [])

    return (
        <div className="add-book-container">
            <h3>Add Book</h3>
            <form className="book-form-container" onSubmit={(event) => handleSubmit(event)}>
                <div className="book-form-inputs">
                    <input type="text" placeholder="title" name="title" onChange={(event) => setTitle(event.target.value)} defaultValue={bookToEdit ? bookToEdit.title : ''}/>
                    <input type="text" placeholder="author" name="author" onChange={(event) => setAuthor(event.target.value)} defaultValue={bookToEdit ? bookToEdit.author : ''}/>
                    <input type="text" placeholder="review" name="review" onChange={(event) => setReview(event.target.value)} defaultValue={bookToEdit ? bookToEdit.review : ''}/>
                    <input type="text" placeholder="genre" name="genre" onChange={(event) => setGenre(event.target.value)} defaultValue={bookToEdit ? bookToEdit.genre : ''}/>
                    <input type="text" placeholder="price" name="price" onChange={(event) => setPrice(event.target.value)} defaultValue={bookToEdit ? bookToEdit.price : ''}/>
                </div>
            </form>
        </div>
    )
}

export default AddBook