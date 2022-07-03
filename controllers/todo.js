const express = require('express');
const router = express.Router();

module.exports = router;

//#region model

class Todo {
  constructor(id, title, completed = false, description = '') {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.description = description;
  }
}

//#endregion

//#region db

/** @type {Todo[]} */
const db = [
  new Todo(1, 'Learn React', true, 'Learn React'),
  new Todo(2, 'Learn Node', false, 'Learn Node'),
  new Todo(3, 'Learn MongoDB', false, 'Learn MongoDB'),
  new Todo(4, 'Learn GraphQL', false, 'Learn GraphQL'),
  new Todo(5, 'Learn TypeScript', false, 'Learn TypeScript'),
  new Todo(6, 'Learn Next.js', false, 'Learn Next.js'),
  new Todo(7, 'Learn React Native', false, 'Learn React Native'),
  new Todo(8, 'Learn Electron', false, 'Learn Electron'),
  new Todo(9, 'Learn Webpack', false, 'Learn Webpack'),
  new Todo(10, 'Learn Webpack Dev Server', false, 'Learn Webpack Dev Server'),
  new Todo(11, 'Learn Babel', false, 'Learn Babel'),
  new Todo(12, 'Learn Webpack Babel', false, 'Learn Webpack Babel'),
  new Todo(13, 'Learn Webpack Babel Dev Server', false, 'Learn Webpack Babel Dev Server'),
  new Todo(14, 'Learn Webpack Babel Hot Module Replacement', false, 'Learn Webpack Babel Hot Module Replacement'),
  new Todo(15, 'Learn Webpack Babel Hot Module Replacement Dev Server', false, 'Learn Webpack Babel Hot Module Replacement Dev Server'),
  new Todo(16, 'Learn Webpack Babel Hot Module Replacement Dev Server', false, 'Learn Webpack Babel Hot Module Replacement Dev Server'),
];

//#endregion

//#region controllers

router.get('/', (req, res) => {
  res.json(db);
});

router.get('/list', (req, res) => {
  res.json(db);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = db.find(t => t.id === id);
  if (todo)
    res.json(todo);
  else
    res.status(404).json({ error: 'Not found' });
});

router.post('/add', (req, res) => {
  const todo = new Todo(db.length + 1, req.body.title);
  db.push(todo);
  res.json(todo);
});

router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = db.find(t => t.id === id);
  if (todo) {
    db.splice(db.indexOf(todo), 1);
  }
  res.json(todo);
});

router.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = db.find(t => t.id === id);
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.description = req.body.description;
  }
  res.json(todo);
});

//#endregion