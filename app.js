const express = require("express");
const indexRoutes = require("./routes/index")
const newRoutes = require("./routes/new.js")
const html = require("html")

const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'));

//routes


app.use("/", indexRoutes)
app.use("/new", newRoutes)



