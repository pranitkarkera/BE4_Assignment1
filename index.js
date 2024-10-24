const express = require('express')
const app = express()
const cors = require("cors");
const {initializeDatabase} = require("./db/db.connect")
const Book = require("./models/books.models")
initializeDatabase()

app.use(cors())
app.use(express.json())

// 1.create a new book data in the books Database

async function createBooks(newBook) {
    try {
        const book = new Book(newBook)
        const saveBook = await book.save()
        return saveBook
    } catch (error) {
        console.log(error)
    }
}

app.post('/books',async(req, res)=> {
    try {
        const savedBook = await createBooks(req.body)
        res.status(200).json({message: "New Book created successfully", newBook: savedBook})
    } catch (error) {
        res.status(500).json({error: "Failed to create a book"})
    }
})


// 3.get all the books in the database as response

async function readAllBooks() {
    try {
        const allBooks = await Book.find()
        return allBooks
    } catch (error) {
        throw error
    }
}

app.get('/books',async(req, res)=> {
    try{
        const books = await readAllBooks()
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

// 4.get a book's detail by its title

async function readBooksByTitle(titleName) {
    try {
        const allBooks = await Book.find({title: titleName})
        return allBooks
    } catch (error) {
        throw error
    }
}

app.get('/books/:titleName',async(req, res)=> {
    try{
        const books = await readBooksByTitle(req.params.titleName)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

// 5.get details of all the books by an author

async function readBooksByAuthor(authorName) {
    try {
        const allBooks = await Book.find({author: authorName})
        return allBooks
    } catch (error) {
        throw error
    }
}

app.get('/books/author/:authorName',async(req, res)=> {
    try{
        const books = await readBooksByAuthor(req.params.authorName)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

//6.get all the books which are of "Business" genre.

async function readBooksByGenre(genreName) {
    try {
        const allBooks = await Book.find({genre: genreName})
        return allBooks
    } catch (error) {
        throw error
    }
}

app.get('/books/genre/:genreName',async(req, res)=> {
    try{
        const books = await readBooksByGenre(req.params.genreName)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

//7. get all the books which was released in the year 2012.
async function readBooksByGenre(yearDetail) {
    try {
        const allBooks = await Book.find({publishedYear: yearDetail})
        return allBooks
    } catch (error) {
        throw error
    }
}

app.get('/books/year/:yearDetail',async(req, res)=> {
    try{
        const books = await readBooksByGenre(req.params.yearDetail)
        if(books.length != 0){
            res.json(books)
        }else{
            res.status(404).json({error: "Book not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch books"})
    }
})

//8.update a book's rating with the help of its id.

async function updateBookById(bookId, dataToUpdate) {
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return updatedBook
    }catch(error){
        console.log("Error in updating book detail", error)
    }
}

app.post('/books/:bookId', async(req, res)=> {
    try{
        const updatedBook = await updateBookById(req.params.bookId, req.body)
        if(updatedBook){
            res.status(200).json({message: "Book updated successfully", updatedBook: updatedBook})
        }else{
            res.status(404).json({error: "Book does not exist"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update book"})
    }
})

//9. update a book's rating with the help of its title.

async function updateBookByTitle(bookTitle, dataToUpdate) {
    try{
        const updatedBook = await Book.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new: true, runValidators: true})
        return updatedBook
    }catch(error){
        console.log("Error in updating book detail", error)
        throw error
    }
}

app.post('/books/:bookTitle', async(req, res)=> {
    try{
        const updatedBook = await updateBookByTitle(parseInt(req.params.bookTitle), req.body)
        if(updatedBook){
            res.status(200).json({message: "Book updated successfully", updatedBook: updatedBook})
        }else{
            res.status(404).json({error: "Book does not exist"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update book"})
    }
})

// 10.delete a book with the help of a book id
async function deleteBook(bookId) {
    try{
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook
    }catch(error){
        console.log(error)
    }
}

app.delete('/books/:bookId', async(req, res)=> {
    try{
        const bookDeleted = await deleteBook(req.params.bookId)
        if(bookDeleted){
            res.status(200).json({message: "Hotel deleted successfully"})
        }
    }catch{
        res.status(500).json({error: "Failed to delete hotel"})
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})