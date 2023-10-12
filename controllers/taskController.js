import * as taskService from '../service/taskService.js';


export async function getTasks(req, res) {
    try {
        if (req.isAuthenticated()) {
            const currentUser = req.user;
            res.render("index.ejs", currentUser);
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function addTask(req, res) {
    if (req.isAuthenticated()) {
        const currentUser = req.user;
        const taskIds = {
            taskRed: req.body["taskRed"],
            taskGreen: req.body["taskGreen"],
            taskPurple: req.body["taskPurple"],
            taskBlue: req.body["taskBlue"]
        };

        try {
            await taskService.addTask(currentUser, taskIds);
            res.redirect('/todolist');
        } catch (error) {
            console.error(error);
        }
    }
}


export async function deleteTask(req, res) {
    if (req.isAuthenticated()) {
        const currentUserId = req.user._id;
        const taskIds = {
            taskRedId: req.body.taskRedId,
            taskGreenId: req.body.taskGreenId,
            taskPurpleId: req.body.taskPurpleId,
            taskBlueId: req.body.taskBlueId
        };

        try {
            await taskService.deleteTask(currentUserId, taskIds);
            res.redirect('/todolist');
        } catch (error) {
            console.error(error);
        }
    }
}