import {useEffect, useState} from "react";
import Book from './Book'
function BookList(){
    const [books,setBooks] = useState([])
    useEffect(() =>{
        fetch('http://localhost:5000/books')
            .then(response => (response.json())
            .then(
                data => {
                    setBooks(data.message.books)
                }
            ))
            .catch(error =>{
                console.log('Error in get call of books')
            })
    },[])
    return(
        <div>
            {
                books.map((book) => {
                    return(
                        <Book key={book.id} book={book}></Book>
                    )
                })
            }
        </div>
    )
}
export default BookList