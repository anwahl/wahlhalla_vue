const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*"
};
const PORT = process.env.PORT || 8080;

const db = require("./app/models");
db.sequelize.sync();

app.use(cors(corsOptions))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get("/", (req, res) => {
        res.json({ message: "Wahlhalla" })
        })
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    });

require("./app/routes/person.routes")(app);

