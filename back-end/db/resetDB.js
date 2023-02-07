// -- /server/db/scripts/resetdb.js
// reset your database
require("dotenv").config();
const { Client } = require("pg");
const SCHEMA_PATH = "./db/schema";
const SEEDS_PATH = "./db/seeds";

const fs = require("fs").promises;

const connObj = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const runMigrations = async (db) => {
  const migrations = await fs.readdir(SCHEMA_PATH);
  for (const migration of migrations) {
    const sql = await fs.readFile(`${SCHEMA_PATH}/${migration}`, "utf8");
    console.log(`\t Running ${migration}`);
    await db.query(sql);
  }
};

const runSeeds = async (db) => {
  const seeds = await fs.readdir(SEEDS_PATH);
  for (const seed of seeds) {
    const sql = await fs.readFile(`${SEEDS_PATH}/${seed}`, "utf8");
    console.log(`\t Running ${seed}`);
    await db.query(sql);
  }
};

const resetDB = async () => {
  const client = new Client(connObj);

  try {
    console.log("Running DB Reset...");
    console.log("Establishing DB connection: ");
    await client.connect();
    console.log("connection established!\n");

    console.log("-- Running Migrations --\n");
    await runMigrations(client);
    console.log("\n");
    console.log("-- Running Seeds --\n");
    await runSeeds(client);
    console.log("\n");
    console.log("-- COMPLETED --");
    client.end();
  } catch (e) {
    console.log("ERROR OCCURED:\n", e);
    client.end();
  }
};

resetDB();
