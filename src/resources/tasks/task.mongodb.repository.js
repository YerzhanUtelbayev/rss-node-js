const Task = require('./task.model');

const create = async (taskData) => {
  const taskDoc = new Task(taskData);
  return await taskDoc.save();
};

const getByBoardId = async (boardId) => await Task.find({ boardId });

const getById = async (taskId) => await Task.findById(taskId);

const update = async (taskId, taskData) =>
  await Task.findByIdAndUpdate(taskId, taskData, {
    new: true,
    runValidators: true
  });

const remove = async (taskId) => await Task.findByIdAndDelete(taskId);

const removeByBoardId = async (boardId) =>
  await Task.findOneAndDelete({ boardId });

const updateMany = async (queryFilter, data) =>
  await Task.updateMany(queryFilter, data);

module.exports = {
  create,
  getByBoardId,
  getById,
  update,
  remove,
  removeByBoardId,
  updateMany
};
