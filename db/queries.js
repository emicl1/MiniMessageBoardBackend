
const pool = require("./pool");
const {use} = require("express/lib/application");





async function getAllMessages(){
    const {rows} =  await pool.query("SELECT * FROM messages")
    return rows
}


async function addMessage(username, message){
    await pool.query("INSERT INTO messages(username, message) VALUES (($1), ($2))", [username, message])
}




module.exports = {getAllMessages, addMessage}




