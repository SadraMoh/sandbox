import express from "express";

const todoRouter = express.Router();

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

todoRouter.get('/', getAllTodos);

todoRouter.get('/list', getAllTodos);

todoRouter.get('/:id', getTodoById);

todoRouter.post('/add', addTodo);

todoRouter.delete('/delete/:id', deleteTodoById);

todoRouter.put('/update/:id', updateTodoById);

//#endregion

//#region services

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function getAllTodos(req, res) {
  res.json(db);
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function getTodoById(req, res) {
  const id = parseInt(req.params.id);
  const todo = db.find(t => t.id === id);
  if (todo)
    res.json(todo);
  else
    res.status(404).json({ error: 'Not found' });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function addTodo(req, res) {
  const todo = new Todo(db.length + 1, req.body.title, req.body.completed, req.body.description);
  db.push(todo);
  res.json(todo);
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function deleteTodoById(req, res) {
  const id = parseInt(req.params.id);
  const todo = db.find(t => t.id === id);
  if (todo) {
    db.splice(db.indexOf(todo), 1);
    res.json(todo);
  }
  else
    res.status(404).json({ error: 'Not found' });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function updateTodoById(req, res) {
  const id = parseInt(req.body.id);
  const todo = db.find(t => t.id === id);
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.description = req.body.description;
    res.json({...todo});
  }
  else
    res.status(404).json({ error: 'Not found' });
}

//#endregion 

export { todoRouter, db, updateTodoById, deleteTodoById, addTodo, getTodoById, getAllTodos };