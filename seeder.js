
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
/*const loading = require("loading-cli");*/
const { MONGODB_URI, MONGODB_PRODUCTION_URI } = process.env;


/**
 * constants
 */
const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB_PRODUCTION_URI : MONGODB_URI
);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("tastings").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    //if (results) {
    //  db.dropDatabase();
    //}

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    //const load = loading("importing items").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "items.json"), "utf8");
    await db.collection("items").insertMany(JSON.parse(data));

 
    
    load.stop();
    console.info(
      `Items imported.`
    );


    process.exit();
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
