import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { tasksRoutes } from "./routes/tasksRoutes.js";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-nabil:Qpalzm19@todo-project.dmk1hup.mongodb.net/todolistDB", { useNewUrlParser: true });

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

app.use("/", tasksRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});