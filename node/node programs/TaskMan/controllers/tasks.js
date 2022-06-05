const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  //console.log(req.params);
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
    //return res.status(404).json({ msg: `No task with ID ${taskID}` }); //occurs when syntax is correct but id doesnt exist
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    //req.body is the new value which is to be inserted
    new: true, //returns the new one result value
    runValidators: true, //runs validations we setup in model task.js
  });
  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID ${taskID}`, 404));
  }
  res.status(200).json({ task });
  //res.status(200).json({ task: null, status: "success" }); //different methods to give response after deletion
  //res.status(200).send();
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
