const express = require("express");
const todoRoutes = express.Router();
const { todoSchemas } = require("../validation");
const middleware = require("../middleware/todo.middleware");
const { todoController } = require("../controllers/index");

todoRoutes.route("/").get(todoController.getTodoList);

todoRoutes.route("/completed").delete(todoController.clearCompleteTodo);

todoRoutes
  .route("/toggle-all")
  .post(
    middleware(todoSchemas.toggleStatusTodoList),
    todoController.toggleStatusTodo
  );

todoRoutes
  .route("/todo")
  .delete(middleware(todoSchemas.todo.objectId), todoController.deleteOneTodo);

todoRoutes
  .route("/todo")
  .post(middleware(todoSchemas.createTodo), todoController.createTodo);

todoRoutes
  .route("/todo")
  .put(middleware(todoSchemas.updateTodo), todoController.updateTodo);

module.exports = todoRoutes;
