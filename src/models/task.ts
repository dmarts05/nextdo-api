import { Schema, model } from 'mongoose';

import { Task } from '../schemas/task';

const TaskSchema = new Schema<Task>(
  {
    completed: {
      default: false,
      required: true,
      type: Boolean,
    },
    description: {
      required: false,
      type: String,
    },
    priority: {
      required: true,
      type: Number,
    },
    title: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TaskModel = model('task', TaskSchema);
export default TaskModel;
