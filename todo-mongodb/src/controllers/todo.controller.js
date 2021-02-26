let { Todo } = require("../models");
const error = require("../utils/errorMessage");

exports.getTodoList = (req, res) => {
  Todo.find(function (err, todo) {
    if (err) {
      res.status(400);
    } else {
      res.status(200);
    }
    return null;
  });
};

exports.deleteOneTodo = (req, res) => {
  let query = { _id: req.body._id };
  Todo.find({ _id: req.body._id }, function (err, item) {
    if (item.length) {
      Todo.deleteOne(query, function (err, todo) {
        if (err) {
          res.status(400).json({ status: "Error occur when delete" });
        }
        res.status(200).json({ status: "delete success" });
        return;
      });
    } else {
      res
        .status(420)
        .send("Id todo is not exited")
        .json({ status: "Id todo is not exited" });
      return;
    }
  });
};

exports.clearCompleteTodo = (req, res) => {
  Todo.remove({ isCompleted: true }, function (err, todo) {
    if (err) {
      res.status(400);
      return;
    } else {
      res.status(200).json({ status: "delete completed success" });
    }
  });
};

exports.toggleStatusTodo = (req, res) => {
  Todo.updateMany(
    { isCompleted: req.body.status },
    {
      $set: {
        isCompleted: !req.body.status,
      },
    },
    function (err, todo) {
      if (err) {
        res
          .status(400)
          .json({ status: "Error occur when toggle status todo list" });
      }
      res.status(200).json({ status: "update many success" });
    }
  );
};

exports.createTodo = (req, res) => {
  let todoUpdate = new Todo(req.body);
  if (
    (todoUpdate.text === undefined && !todoUpdate.text) ||
    typeof todoUpdate.isCompleted === typeof false
  ) {
    res.status(400).json({ status: "invalid field" });
    return;
  } else {
    todoUpdate.save().then((todo) => {
      res.status(201).json({ status: "todo added successfully" });
    });
  }
};

exports.updateTodo = (req, res) => {
  let todoUpdate = new Todo(req.body);
  if (
    todoUpdate._id === undefined ||
    todoUpdate.text === undefined ||
    !todoUpdate.text ||
    !todoUpdate._id ||
    todoUpdate.isCompleted === undefined
  ) {
    res.status(400).json({ status: "Invalid data to update todo" });
    return;
  }
  Todo.find({ _id: todoUpdate._id }, function (err, item) {
    if (item.length) {
      Todo.updateOne({ _id: todoUpdate._id }, todoUpdate, function (err, data) {
        if (err) {
          res.status(400).json({ status: "bad request" });
          return;
        } else {
          res.status(error.OK.code).json(error.OK);
        }
      });
    } else {
      res.status(error._ID_IS_NOT_EXITED.code).json(error._ID_IS_NOT_EXITED);
    }
  });
};
