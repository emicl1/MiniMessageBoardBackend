
const db = require("../db/queries")

const newPage = (req, res) =>{
    res.render("newPage")
}


const newMesage = async (req, res) => {
    console.log(req.body.user + req.body.message)
    await db.addMessage(req.body.user, req.body.message)
    res.redirect("/")
}



module.exports = {
    newPage,
    newMesage
}