const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const Routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//config dot env
dotenv.config();

//Object
const app = express();
app.use(cors());
app.use(cookieParser());

//port
const PORT = 5000 || process.env.PORT;

//database call
db();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", (req, res) => {
//   res.send("hello");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Available Routes
app.use("/", Routes);

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
