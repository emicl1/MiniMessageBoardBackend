
const pool = require("./pool");


async function getAllMessages() {
    const { rows } = await pool.query(`
        SELECT messages.message, messages.id, users.username AS author
        FROM messages
        JOIN users ON users.id = messages.user_id
    `)
    return rows
}

async function findUserByUsername(username){
    await pool.query("select * from users where username=($1)", [username])
}

async function findUserByIdNew(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows[0]
}

async function addMessage(user_id, message){
    await pool.query("INSERT INTO messages(user_id, message) VALUES (($1), ($2))", [user_id, message])
}

async function addUser(firstname, lastname, username, password) {
    await pool.query(
        "INSERT INTO users(firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
        [firstname, lastname, username, password]
    )
}


module.exports = {findUserById: findUserByUsername, getAllMessages, addMessage, addUser, findUserByIdNew}




