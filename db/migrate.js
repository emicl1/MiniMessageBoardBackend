#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
    message TEXT
);

INSERT INTO messages(username, message)
VALUES
  ('Bryan', 'heyyyy'),
  ('Odin', 'whatsuppss'),
  ('Damon', 'fdsafasd');
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
