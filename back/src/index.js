const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(` Example app listening at http://localhost:${port}`);
});

const db = require("./config/db.js");

const auth = require("./routes/auth/auth");
auth(app, db);

const todos = require("./routes/todos/todos");
todos(app, db);

const user = require("./routes/user/user");
user(app, db);

module.exports = app;
