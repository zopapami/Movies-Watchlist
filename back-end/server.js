const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// cors 
let corsOptions = { origin: "http://localhost:8081" };
app.use(cors(corsOptions));

// parse requests of content-type:
// application/json
app.use(bodyParser.json());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// dotenv
require("dotenv").config();

// connect database - mongoose
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// routes
require("./app/routes/movie.routes")(app);

// set port
const port = process.env.SERVER_PORT;
// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
