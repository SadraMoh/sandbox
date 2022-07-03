import { jest } from '@jest/globals'

import { todoRouter, updateTodoById, deleteTodoById, addTodo, getTodoById, getAllTodos, db } from "../controllers/todo.js";

describe('todo api', () => {

  test('todoRouter exists', () => {

    expect(todoRouter).toBeDefined();

  });

  test('getAllTodos', () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    getAllTodos(req, res);

    expect(res.json).toHaveBeenCalledWith(db);
  });

  test('getTodoById', () => {
    const req = {
      params: {
        id: 1
      }
    };
    const res = {
      json: jest.fn()
    };
    getTodoById(req, res);

    expect(res.json).toHaveBeenCalledWith(db.find(t => t.id === 1));
  });

  test('addTodo', () => {

    const payload = {
      title: 'test',
      completed: false,
      description: 'test'
    };

    const req = {
      body: payload
    };

    const res = {
      json: jest.fn()
    };
    addTodo(req, res);

    expect(res.json).toHaveBeenCalledWith({ ...payload, id: db.length });

    expect(db).toContainEqual({ ...payload, id: db.length });

  });

  test('updateTodoById', () => {

    const payload = {
      id: 3,
      title: 'test',
      completed: false,
      description: 'test'
    }

    const req = {
      body: payload
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    const target = db.find(t => t.id === 3);

    updateTodoById(req, res);

    expect(res.json).toHaveBeenCalledWith({ ...target });

    expect(db).toContainEqual({ ...target });

  });

  test('deleteTodoById', () => {
    const req = {
      params: {
        id: 2
      }
    };
    const res = {
      json: jest.fn()
    };

    const target = db.find(t => t.id === 2);

    deleteTodoById(req, res);

    expect(res.json).toHaveBeenCalledWith({ ...target });

    expect(db).not.toContainEqual({ ...target });

  });

});
