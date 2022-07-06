import express from "express";
import { randomUUID } from "crypto";

const todoRouter = express.Router();

//#region model

class Todo {
  constructor(id, title, completed = false, description = '') {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.description = description;
  }

  static id() {
    return randomUUID();
  }
}

//#endregion

//#region db

/** @type {Todo[]} */
const db = [
  new Todo(Todo.id(), 'Learn React', true, 'Learn React'),
  new Todo(Todo.id(), 'Learn Node', false, 'Learn Node'),
  new Todo(Todo.id(), 'Learn MongoDB', false, 'Learn MongoDB'),
  new Todo(Todo.id(), 'Learn GraphQL', false, 'Learn GraphQL'),
  new Todo(Todo.id(), 'Learn TypeScript', false, 'Learn TypeScript'),
  new Todo(Todo.id(), 'Learn Next.js', false, 'Learn Next.js'),
  new Todo(Todo.id(), 'Learn React Native', false, 'Learn React Native'),
  new Todo(Todo.id(), 'Learn Electron', false, 'Learn Electron'),
  new Todo(Todo.id(), 'Learn Webpack', false, 'Learn Webpack'),
  new Todo(Todo.id(), 'Learn Webpack Dev Server', false, 'Learn Webpack Dev Server'),
  new Todo(Todo.id(), 'Learn Babel', false, 'Learn Babel'),
  new Todo(Todo.id(), 'Learn Webpack Babel', false, 'Learn Webpack Babel'),
  new Todo(Todo.id(), 'Learn Webpack Babel Dev Server', false, 'Learn Webpack Babel Dev Server'),
  new Todo(Todo.id(), 'Learn Webpack Babel Hot Module Replacement', false, 'Learn Webpack Babel Hot Module Replacement'),
  new Todo(Todo.id(), 'Learn Webpack Babel Hot Module Replacement Dev Server', false, 'Learn Webpack Babel Hot Module Replacement Dev Server'),
  new Todo(Todo.id(), 'Learn Webpack Babel Hot Module Replacement Dev Server', false, 'Learn Webpack Babel Hot Module Replacement Dev Server'),
];

//#endregion

//#region controllers

todoRouter.get('/', getAllTodos);

todoRouter.get('/list', getAllTodos);

todoRouter.get('/:id', getTodoById);

todoRouter.post('/add', addTodo);

todoRouter.delete('/delete/:id', deleteTodoById);

todoRouter.post('/update/:id', updateTodoById);

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
  const id = (req.params.id);
  const todo = db.find(t => t.id === id);
  if (todo)
    res.json(todo);
  else
    res.status(404).json({ error: 'Todo not found' });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function addTodo(req, res) {
  const todo = new Todo(Todo.id(), req.body.title, req.body.completed, req.body.description);
  db.push(todo);
  res.json(todo);
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function deleteTodoById(req, res) {
  const id = (req.params.id);
  const todo = db.find(t => t.id === id);

  console.log('id', id)
  console.log('todo', todo)

  if (todo) {
    db.splice(db.indexOf(todo), 1);
    res.json(todo);
  }
  else
    res.status(404).json({ error: 'Todo not found' });
}

/**
 * @param {import("express").Request} req 
 * @param {import("express").Request} res 
 */
function updateTodoById(req, res) {
  const id = (req.params.id);
  const todo = db.find(t => t.id === id);

  console.log('id', id)
  console.log('todo', todo)

  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    todo.description = req.body.description;
    res.json({ ...todo });
  }
  else
    res.status(404).json({ error: 'Todo not found' });
}

//#endregion 

export { todoRouter, db, updateTodoById, deleteTodoById, addTodo, getTodoById, getAllTodos };