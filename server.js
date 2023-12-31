const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { createServer } = require('node:http');
const app = require("./app.js");
const mongoose = require("mongoose");
const socketServer = require("./socketServer.js");
const server = createServer(app);

con = process.env.DB_CONNECTION;
con = con.replace("<PASSWORD>", process.env.DB_PASSWORD);
try {
  mongoose.set("strictQuery", true);
  mongoose.connect(con).then(() => {
    console.log("Database Connection successfull");
  });
} catch (er) {
  console.log(er);
}
console.log(process.env.NODE_ENV);
 server.listen(8080, () => {
  console.log("Listening on port 8080");
});

socketServer(server);
