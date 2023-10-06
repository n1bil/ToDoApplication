import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    redTasks: [{name: String}],
    greenTasks: [{name: String}],
    purpleTasks: [{name: String}],
    blueTasks: [{name: String}], 
});

const ToDo = mongoose.model('ToDo', todoSchema);

export default ToDo;