import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
        validate: {
            validator: function(v) {
                return v >= new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },
    priority: {
        type: String,
        required: true,
        enum: {
            values: ['low', 'medium', 'high'],
            message: '{VALUE} is not a valid priority level'
        },
        default: 'medium'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must be assigned to a user']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

taskSchema.pre('save', function(next) {
    if (this.isModified('dueDate') && this.dueDate < new Date()) {
        next(new Error('Due date cannot be in the past'));
    }
    next();
});

export default mongoose.model('Task', taskSchema);