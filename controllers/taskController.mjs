import Task from '../models/taskModel.mjs';

export const createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            createdBy: req.user._id
        });
        const newTask = await task.save();
        await newTask.populate(['assignedTo', 'createdBy']);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const filters = {};
        if (req.query.status) filters.status = req.query.status;
        if (req.query.priority) filters.priority = req.query.priority;
        if (req.query.assignedTo) filters.assignedTo = req.query.assignedTo;

        const tasks = await Task.find(filters)
            .populate('assignedTo', 'firstName lastName')
            .populate('createdBy', 'firstName lastName')
            .sort({ dueDate: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'firstName lastName')
            .populate('createdBy', 'firstName lastName');
            
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const allowedUpdates = ['title', 'description', 'dueDate', 'status', 'priority', 'assignedTo'];
        const updates = Object.keys(req.body)
            .filter(update => allowedUpdates.includes(update))
            .forEach(update => task[update] = req.body[update]);

        await task.save();
        await task.populate(['assignedTo', 'createdBy']);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ 
            message: 'Task deleted successfully',
            taskId: task._id 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.userId })
            .populate('assignedTo', 'firstName lastName')
            .populate('createdBy', 'firstName lastName')
            .sort({ dueDate: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};