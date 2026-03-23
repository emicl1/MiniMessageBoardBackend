
const db = require("../db/queries")

const newPage = (req, res) =>{
    res.render("newPage")
}


const newMesage = async (req, res) => {
    let user = await db.findUserById(req.body.user)
    await db.addMessage(user.id, req.body.message)
    res.redirect("/")
}



module.exports = {
    newPage,
    newMesage
}