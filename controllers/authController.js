import passport from "passport";
import * as authService from "../service/authService.js";


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

export const postRegister = async (req, res) => {
    try {
        await authService.registerUser(req.body);
        passport.authenticate('local')(req, res, () => {
            res.redirect("/todolist");
        });
    } catch (err) {
        console.log(err);
        res.redirect("/register");
    }
};

export const postLogin = async (req, res, next) => {
    try {
        await authService.authenticateUser(req, res, next);
        res.redirect('/todolist');
    } catch (err) {
        console.log(err);
        res.redirect('/login', { error: req.flash('info') });
    }
};