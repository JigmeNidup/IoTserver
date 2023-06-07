var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mqttHandler = require("./mqtt_handler");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const db = require("./database/db");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    Credential: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/daily", async (req, res) => {
  try {
    let { date } = req.body;
    let data = await db.query(
      "SELECT dtime, SUM(air_conditioner) AS sum_air, SUM(computer) AS sum_computer, SUM(fan) AS sum_fan, SUM(fridge) AS sum_fridge, SUM(laptop) AS sum_laptop, SUM(printer) AS sum_printer, SUM(tv) AS sum_tv FROM main WHERE ddate = $1 GROUP BY dtime ORDER BY dtime",
      [date]
    );
    res.json(data.rows);
  } catch (error) {
    res.json({
      status: "error",
      data: error.message,
    });
  }
});

app.get("/data", async (req, res) => {
  try {
    let data = await db.query("SELECT SUM(air_conditioner) AS sum_air, SUM(computer) AS sum_computer, SUM(fan) AS sum_fan, SUM(fridge) AS sum_fridge, SUM(laptop) AS sum_laptop, SUM(printer) AS sum_printer, SUM(tv) AS sum_tv FROM main");
    
    /*
    //send to ML model 
    
    */
    
    res.json({
      data: data.rows[0],
    });
  } catch (error) {
    res.json({
      status: "error",
      data: error.message,
    });
  }
});

app.post("/send-mqtt", function (req, res) {
  mqttClient.sendMessage(req.body.message);
  res.status(200).send("Message sent to mqtt");
});

var server = app.listen(process.env.PORT, function () {
  console.log("app running on port.", server.address().port);
});
