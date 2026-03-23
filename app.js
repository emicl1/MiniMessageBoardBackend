const express = require("express");
require("dotenv").config()
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/pool")
const { validPassword, genPassword} = require("./helper/authHelper")

const indexRoutes = require("./routes/index")
const newRoutes = require("./routes/new.js")
const authRoutes = require("./routes/auth")
const {body, validationResult} = require("express-validator")

const app = express();

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));


passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            let match = await validPassword(password, user.password)
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch(err) {
        done(err);
    }
});


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))


app.use(passport.initialize());
app.use(passport.session())

//routes

app.use("/", indexRoutes)
app.use("/new", newRoutes)
app.use("/auth", authRoutes)


const PORT = 3001;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});


