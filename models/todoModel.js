import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import passport from "passport";

const todoSchema = new mongoose.Schema({
    username: String,
    password: String,
    redTasks: [{name: String}],
    greenTasks: [{name: String}],
    purpleTasks: [{name: String}],
    blueTasks: [{name: String}], 
});

todoSchema.plugin(passportLocalMongoose);

const ToDo = mongoose.model('ToDo', todoSchema);

passport.use(ToDo.createStrategy());

passport.serializeUser(ToDo.serializeUser());
passport.deserializeUser(ToDo.deserializeUser());

export default ToDo;