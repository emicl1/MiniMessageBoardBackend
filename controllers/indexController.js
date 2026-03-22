
const db= require("../db/queries")



const index = async (req, res) =>{
    const messages = await db.getAllMessages()
    console.log(messages)
    res.render('index', {title: "Mini Message board", messages})
}

module.exports = {
    index
}









