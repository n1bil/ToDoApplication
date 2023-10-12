import ToDo from "../models/todoModel.js";


export const addTask = async (currentUser, taskIds) => {
    if (taskIds.taskRed) {
        currentUser.redTasks.push({ name: taskIds.taskRed });
    }
    if (taskIds.taskGreen) {
        currentUser.greenTasks.push({ name: taskIds.taskGreen });
    }
    if (taskIds.taskPurple) {
        currentUser.purpleTasks.push({ name: taskIds.taskPurple });
    }
    if (taskIds.taskBlue) {
        currentUser.blueTasks.push({ name: taskIds.taskBlue });
    }
    await currentUser.save();
};

export const deleteTask = async (currentUserId, taskIds) => {
    if (taskIds.taskRedId) {
        await ToDo.findByIdAndUpdate(
            { _id: currentUserId },
            { $pull: { redTasks: { _id: taskIds.taskRedId } } },
            { new: true }
        );
    }

    if (taskIds.taskGreenId) {
        await ToDo.findByIdAndUpdate(
            { _id: currentUserId },
            { $pull: { greenTasks: { _id: taskIds.taskGreenId } } },
            { new: true }
        );
    }

    if (taskIds.taskPurpleId) {
        await ToDo.findByIdAndUpdate(
            { _id: currentUserId },
            { $pull: { purpleTasks: { _id: taskIds.taskPurpleId } } },
            { new: true }
        );
    }

    if (taskIds.taskBlueId) {
        await ToDo.findByIdAndUpdate(
            { _id: currentUserId },
            { $pull: { blueTasks: { _id: taskIds.taskBlueId } } },
            { new: true }
        );
    }
};
