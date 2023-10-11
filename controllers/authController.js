import ToDo from "../models/todoModel.js";
import passport from "passport";

export const start = async (req, res) => {
    res.render("start.ejs");
};

export const register = async (req, res) => {
    res.render("register.ejs");
};

export const login = async (req, res) => {
    res.render("login.ejs");
};

export const todolist = async (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index.ejs");
    } else {
        res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};


export const postRegister = (req, res) => {
    const newUser = new ToDo({
        username: req.body.username,
        password: req.body.password,
        redTasks: [],
        greenTasks: [],
        purpleTasks: [],
        blueTasks: [],
    });

    ToDo.register(newUser, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                req.flash("error", "Регистрация не удалась. Пожалуйста, попробуйте еще раз.");
                res.redirect("/register");
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect("/todolist");
                });
            }
        }
    );
};

export const postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            // Неудачная аутентификация, перенаправление на страницу входа с сообщением об ошибке
            return res.redirect('/login?error=invalid_credentials');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            // Успешная аутентификация, перенаправление на страницу списка дел
            return res.redirect('/todolist');
        });
    })(req, res, next);
};


// export const postLogin = async (req, res) => {
    // const username = req.body.username;
    // const password = req.body.password;

    // try {
    //     const user = await ToDo.findOne({ username: username });
    //     bcrypt.compare(password, user.password, (err, result) => {
    //         if (result) {
    //             res.render("index.ejs", user);
    //         }
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
// };

// bcrypt.hash(req.body.password, 5, async (err, hash) => {
    //     const newUser = new ToDo({
    //         username: req.body.username,
    //         password: hash,
    //         redTasks: [],
    //         greenTasks: [],
    //         purpleTasks: [],
    //         blueTasks: [],
    //     });

    //     try {
    //         await newUser.save();
    //         res.render('index.ejs', newUser);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });