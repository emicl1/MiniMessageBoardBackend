
const {messages} = require("../models/messages")

const newPage = (req, res) =>{
    res.render("newPage")
}


const newMesage = (req, res) => {
    messages.push({
        user: req.body.user,
        text: req.body.message,
        added: new Date()
    })
    res.redirect("/")
}



module.exports = {
    newPage,
    newMesage
}