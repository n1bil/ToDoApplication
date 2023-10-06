import ToDo from "../models/todoModel.js";


export async function getTasks(req, res) {
    try {
        const tasks = await ToDo.findOne({});
        console.log(tasks);
        res.render('index.ejs', tasks);
    } catch (error) {
        console.log(error);
    }
};

export async function addTask(req, res) {
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
};

export async function deleteTask(req, res) {
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
};