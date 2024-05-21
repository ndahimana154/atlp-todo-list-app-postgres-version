import User from "./usersModal";
import Task from "./tasksModal";

// User has many Tasks
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',  // Alias for the association
});

// Task belongs to User
Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',  // Alias for the association
});