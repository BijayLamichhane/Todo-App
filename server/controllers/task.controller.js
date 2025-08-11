import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, description, date, isCompleted, isImportant } = req.body;

    if (!title || !description || !date) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please fill all the required fields",
        });
    }

    await Task.create({
      title,
      description,
      date,
      isCompleted: isCompleted ?? false,
      isImportant: isImportant ?? false,
      user: userId,
    });

    res
      .status(201)
      .json({ success: true, message: "Task created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id || req.body.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    await task.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id || req.body.id;

    const { title, description, date, isCompleted, isImportant } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    if (task.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (date) {
      task.date = date;
    }
    if (typeof isCompleted !== "undefined") {
      task.isCompleted = isCompleted;
    }
    if (typeof isImportant !== "undefined") {
      task.isImportant = isImportant;
    }

    await task.save();
    res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
