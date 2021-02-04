const express = require("express");
const todoRoutes = express.Router();

let Todo = require("./todo.modal");

todoRoutes.route("/get").get(function (req, res) {
  Todo.find(function (err, todo) {
    if (err) {
      throw err
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route("/add").post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ status: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to db");
    });
});

todoRoutes.route("/update").put(function (req, res) {
  Todo.updateOne({ id: req.body.data.id }, req.body.data, function (err, data) {
    if (err) throw err;
    res.status(200).json({ status: "update success" });
  });
});

todoRoutes.route("/delete").delete(function (req, res) {
  let query = { id: req.body.id };
  Todo.deleteOne(query, function (err, todo) {
    if (err) throw err;
    res.status(200).json({ status: "delete success" });
  });
});

todoRoutes.route("/clearCompleted").delete(function (req, res) {
  Todo.remove({ isCompleted: true }, function (err, todo) {
    if (err) throw err;
    res.status(200).json({ status: "delete completed success" });
  });
});

todoRoutes.route("/updateMany").post(function (req, res) {
  Todo.updateMany(
    { isCompleted: req.body.status },
    {
      $set: {
        isCompleted: !req.body.status,
      }
    }, function (err, todo) {
      if (err) throw err;
      res.status(200).json({status: "update many success"})
    }
  );
});

module.exports = todoRoutes;
