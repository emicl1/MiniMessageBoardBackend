#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    status VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
    message TEXT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (firstname, lastname, username, password, status) VALUES
                                                                        ('Ash',    'Ketchum',  'a',   '123', 'member'),
                                                                        ('Misty',  'Waterflow','b',  '123', 'member'),
                                                                        ('Brock',  'Harrison', 'c',  '123', 'admin'),
                                                                        ('Gary',   'Oak',      'gary',   'password123', 'member'),
                                                                        ('Jesse',  'Team',     'jesse',  'password123', 'member');

INSERT INTO messages (user_id, message) VALUES
                                            (1, 'I wanna be the very best!'),
                                            (2, 'My bike!! You owe me a bike!'),
                                            (3, 'I am the worlds greatest pokemon breeder'),
                                            (4, 'Smell ya later Ash!'),
                                            (1, 'Pikachu I choose you!'),
                                            (5, 'Prepare for trouble!');

`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: "postgresql://" + process.env.DB_USER + ":" +process.env.DB_PASSWORD +"@localhost:5432/" + process.env.DB_NAME,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
