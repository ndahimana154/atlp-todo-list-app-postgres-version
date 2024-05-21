import taskModel from "../../../database/models/tasksModal";
// Function to create task
const createTask = async (
  userId: Number,
  title: string,
  description: string
) => {
  return taskModel.create({
    title: title,
    description: description,
    userId: userId,
  });
};

//  Function to getall tasks
const getTasks = async () => {
  return taskModel.findAll({ order: [["createdAt", "DESC"]] });
};

// Function to get all tasks by userid
const getTasksByUser = async (userId: Number) => {
  return taskModel.findAll({
    where: {
      userId: userId,
    },
  });
};

// Function to get one task
const getOneTask = async (id: Number) => {
  return taskModel.findOne({
    where: {
      id: id,
    },
  });
};
// Function to delete task
const deleteOneTask = async (id: Number) => {
  return taskModel.destroy({
    where: {
      id: id,
    },
  });
};

// Function to update task
const updateTask = async (id: Number, title: string, description: string) => {
  await taskModel.update(
    {
      title: title,
      description: description,
    },
    {
      where: { id: id },
    }
  );
  return await taskModel.findOne({
    where: {
      id: id,
    },
  });
};
export default {
  createTask,
  getTasks,
  getTasksByUser,
  getOneTask,
  deleteOneTask,
  updateTask,
};
