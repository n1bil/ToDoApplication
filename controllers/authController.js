export const start = async (req, res) => {
    res.render('start.ejs');
}

export const register = async (req, res) => {
    res.render('register.ejs');
}

export const login = async (req, res) => {
    res.render('login.ejs');
}