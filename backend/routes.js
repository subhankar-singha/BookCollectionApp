import express from 'express';
import Book from './books.model.js';


const router = express.Router();

router.get('/api/books',async (req,res)=>{
    try{
        const books = await Book.find().select('-_id -__v');
        res.status(200).json(books);
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.post('/api/books',async (req,res)=>{
    const bookDetails = req.body;
    try{
        const newBook = await Book.create(bookDetails)
        res.status(201).json(newBook)
    }catch(err){
        res.status(400).json(err.message)
    }
});

router.put('/api/books/:name',async (req,res)=>{
    const bookName = req.params.name;
    const bookChanges =  req.body;
    try{
        const booktoChange = await Book.findOneAndReplace({title:bookName},{title:bookChanges.title,author:bookChanges.author,description:bookChanges.description},{new:true,upsert:false});
        if (!booktoChange) {
            return res.status(404).send("Book not found");
        }
        res.status(200).json(booktoChange)
    }catch(err){
        res.status(400).send(`Error: ${err.message}`)
    }
});

router.delete('/api/books/:name',async (req,res)=>{
    const bookName = req.params.name;
    try{
        const bookDelete = await Book.findOneAndDelete({ title: new RegExp(`^${bookName}$`, 'i') });
        if(!bookDelete){
            return res.status(404).send("No Book found");
        }
        res.status(200).json({message:"Book deleted succesfully!",deletedBook: bookDelete});
    }catch(err){
        res.status(400).send(`Error: ${err.message}`)
    }
});

export default router;