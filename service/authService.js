import ToDo from "../models/todoModel.js";
import passport from "passport";


export const registerUser = async (userData) => {
    const { username, password } = userData;
    const newUser = new ToDo({
        username,
        password,
        redTasks: [],
        greenTasks: [],
        purpleTasks: [],
        blueTasks: [],
    });

    return new Promise((resolve, reject) => {
        ToDo.register(newUser, password, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

export const authenticateUser = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            if (!user) {
                return res.redirect('/login?error=invalid_credentials');
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
        })(req, res, next);
    });
}