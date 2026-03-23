
const db= require("../db/queries")



const index = async (req, res) => {
    const messages = await db.getAllMessages()

    if (req.isAuthenticated()) {
        res.render('index', {
            title: "Mini Message Board",
            messages
        })
    } else {
        const sanitized = messages.map(mes => ({
            ...mes,
            author: "Anonymous"
        }))
        res.render('index', {
            title: "Unauthorized",
            messages: sanitized
        })
    }
}


module.exports = {
    index
}









