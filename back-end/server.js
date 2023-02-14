const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const port = 4000;
const db = require("./config/connectDB");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const listsRoutes = require("./routes/lists");

// mount routes
app.use("/api/users", usersRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/lists", listsRoutes(db));

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
