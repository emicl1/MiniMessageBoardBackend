
const {messages} = require("../models/messages")

console.log(messages)

const index = (req, res) =>{
    res.render('index', {title: "Mini Message board", messages})
}

module.exports = {
    index
}









