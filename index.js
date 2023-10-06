import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// *MongoDB settings
mongoose.connect("mongodb+srv://admin-nabil:Qpalzm19@todo-project.dmk1hup.mongodb.net/todolistDB", { useNewUrlParser: true });

const todoSchema = new mongoose.Schema({
    redTasks: [{name: String}],
    greenTasks: [{name: String}],
    purpleTasks: [{name: String}],
    blueTasks: [{name: String}], 
});

const ToDo = mongoose.model('ToDo', todoSchema);

app.use((req, res, next) => {
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    
    res.locals.currentDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
    next();
});

app.get("/", async (req, res) => {
    try {
        const tasks = await ToDo.findOne({});
        console.log(tasks);
        res.render('index.ejs', tasks);
    } catch (error) {
        console.log(error);
    }
});

app.post("/submit", async (req, res) => {
    const taskRed = req.body['taskRed'];
    const taskGreen = req.body['taskGreen'];
    const taskPurple = req.body['taskPurple'];
    const taskBlue = req.body['taskBlue'];

    try {
        const existingToDo = await ToDo.findOne({});
        if (existingToDo) {
            if (taskRed) {
                existingToDo.redTasks.push({ name: taskRed });
            }
            if (taskGreen) {
                existingToDo.greenTasks.push({ name: taskGreen });
            }
            if (taskPurple) {
                existingToDo.purpleTasks.push({ name: taskPurple });
            }
            if (taskBlue) {
                existingToDo.blueTasks.push({ name: taskBlue });
            }
            await existingToDo.save();
        } else {
            const newToDo = new ToDo({
                redTasks: taskRed ? [{ name: taskRed }] : [],
                greenTasks: taskGreen ? [{ name: taskGreen }] : [],
                purpleTasks: taskPurple ? [{ name: taskPurple }] : [],
                blueTasks: taskBlue ? [{ name: taskBlue }] : [],
            });
            await newToDo.save();
        }
         res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post("/delete", async (req, res) => {
    const taskRedId = req.body.taskRedId;
    const taskGreenId = req.body.taskGreenId;
    const taskPurpleId = req.body.taskPurpleId;
    const taskBlueId = req.body.taskBlueId;

    try {
        if (taskRedId) {
        await ToDo.findByIdAndUpdate(
            { _id: "651fa91c8fc7a17d8d5d8840" },
            { $pull: { redTasks: { _id: taskRedId } } },
            { new: true }
        );
        }

        if (taskGreenId) {
        await ToDo.findByIdAndUpdate(
            { _id: "651fa91c8fc7a17d8d5d8840" },
            { $pull: { greenTasks: { _id: taskGreenId } } },
            { new: true }
        );
        }

        if (taskPurpleId) {
        await ToDo.findByIdAndUpdate(
            { _id: "651fa91c8fc7a17d8d5d8840" },
            { $pull: { purpleTasks: { _id: taskPurpleId } } },
            { new: true }
        );
        }

        if (taskBlueId) {
        await ToDo.findByIdAndUpdate(
            { _id: "651fa91c8fc7a17d8d5d8840" },
            { $pull: { blueTasks: { _id: taskBlueId } } },
            { new: true }
        );
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});




/*
app.post("/delete", async (req, res) => {
    const taskId = req.body.taskId;
    console.log(taskId);
    const result = await ToDo.findById({"redTasks._id": taskId});
    console.log(result);
})
*/

































/*
app.use((req, res, next) => {
    const taskRed = req.body['taskRed'];
    const taskGreen = req.body['taskGreen'];
    const taskPurple = req.body['taskPurple'];
    const taskBlue = req.body['taskBlue'];
    
    if (taskRed) {
        tasks.redTasks.push(taskRed)
    }

    if (taskGreen) {
        tasks.greenTasks.push(taskGreen);
    }

    if (taskPurple) {
        tasks.purpleTasks.push(taskPurple);
    }

    if (taskBlue) {
        tasks.blueTasks.push(taskBlue);
    }

    next();
});
*/