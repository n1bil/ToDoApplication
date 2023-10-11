import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config';
import { tasksRoutes } from "./routes/tasksRoutes.js";
import ejs from 'ejs';
import passport from "passport";
import session from "express-session";


const app = express();
const port = process.env.PORT || 3000;

// mongoose.set('strictQuery', false);
// const connectDB = async () => {
//     try {
//         const connect = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${connect.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({ secret: 'Our little secret.', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/todoDB', { useNewUrlParser: true });

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
    console.log(`Server started on port ${port}`);
});

// connectDB().then(() => {
//     app.listen(port, () => {
//         console.log(`Server running on port ${port}`);
//     })
// })