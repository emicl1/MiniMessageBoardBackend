
const bcryptjs = require("bcryptjs");

async function validPassword(password, hash) {
    return  await bcryptjs.compare(password, hash);
}


async function genPassword(password) {
    return  await bcryptjs.hash(password, 10);
}

module.exports = {
    validPassword,
    genPassword
}