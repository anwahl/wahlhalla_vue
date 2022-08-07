const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:5173"
};
const PORT = process.env.PORT || 8080;

const db = require("./app/models");
db.sequelize.sync({ force: true });

app.use(cors(corsOptions))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get("/", (req, res) => {
        res.json({ message: "Wahlhalla" })
        })
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`)
    });

require("./app/routes/assignedTask.routes")(app);
require("./app/routes/person.routes")(app);
require("./app/routes/subtask.routes")(app);
require("./app/routes/target.routes")(app);
require("./app/routes/targetType.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/taskType.routes")(app);

