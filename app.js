import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config';
import { tasksRoutes } from "./routes/tasksRoutes.js";
import passport from "passport";
import session from "express-session";
import { currentDateMiddleware } from "./utils/currentDateMiddleware.js";

const app = express();
const port = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({ secret: 'Our little secret.', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(currentDateMiddleware);
app.use("/", tasksRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
});

// mongoose.connect('mongodb://127.0.0.1:27017/todoDB', { useNewUrlParser: true });