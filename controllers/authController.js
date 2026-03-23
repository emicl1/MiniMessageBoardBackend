
const passport = require("passport");
const {genPassword} = require("../helper/authHelper")
const db = require("../db/queries")

const loginPage = (req,res) => {
    console.log("loginPage hit")
    res.render("auth/login")
}

const login = passport.authenticate("local", {
    failureRedirect: "/auth/login",
    successRedirect: "/",
})

const signupPage = (req,res) => {
    res.render("auth/signup")
}

const signup = async (req, res) => {
    let pass = await genPassword(req.body.password)
    await db.addUser(req.body.firstname, req.body.lastname, req.body.username, pass)
    res.redirect("/auth/login")  // redirect not render
}


const logout = (req, res) => {
    req.logout(() => {
        res.redirect("/")
    })
}


module.exports = {
    loginPage,
    login,
    signup,
    signupPage,
    logout
}









