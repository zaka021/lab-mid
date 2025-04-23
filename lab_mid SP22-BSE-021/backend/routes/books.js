const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.get('/', async (req, res) => {
  try {
    const { author } = req.query;
    const query = author ? { author: new RegExp(author, 'i') } : {};
    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, author, price } = req.body;
    
    // Validate required fields
    if (!title || !author || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).json({ error: 'Failed to save book' });
  }
});

module.exports = router;
