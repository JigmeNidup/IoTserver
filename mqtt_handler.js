const mqtt = require("mqtt");
const db = require("./database/db");
const moment = require("moment");

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "mqtt://broker.hivemq.com";
    this.username = "YOUR_USER"; // mqtt credentials if these are needed to connect
    this.password = "YOUR_PASSWORD";
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    // Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    
    this.mqttClient.subscribe("car_hackathonfan1", { qos: 0 });
    this.mqttClient.subscribe("air_conditioner_hackathonfan1", { qos: 0 });
    this.mqttClient.subscribe("computer_hackathonfan2", { qos: 0 });
    this.mqttClient.subscribe("fan_hackathonfan3", { qos: 0 });
    this.mqttClient.subscribe("fridge_hackathonfan4", { qos: 0 });
    this.mqttClient.subscribe("laptop_hackathonfan5", { qos: 0 });
    this.mqttClient.subscribe("printer_hackathonfan6", { qos: 0 });
    this.mqttClient.subscribe("tv_hackathonfan7", { qos: 0 });
    // When a message arrives, console.log it
    this.mqttClient.on("message", function (topic, message) {
      try {
        let date = moment().toISOString();
        let datetext = String(date);
        let time = moment().format("H:00:00");
        let data = Number(message.toString()) / 10000;
        switch (topic) {
          case "air_conditioner_hackathonfan1":
            db.query(
              "INSERT INTO main(topic,air_conditioner,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "computer_hackathonfan2":
            db.query(
              "INSERT INTO main(topic,computer,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "fan_hackathonfan3":
            db.query(
              "INSERT INTO main(topic,fan,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "fridge_hackathonfan4":
            db.query(
              "INSERT INTO main(topic,fridge,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "laptop_hackathonfan5":
            db.query(
              "INSERT INTO main(topic,laptop,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "printer_hackathonfan6":
            db.query(
              "INSERT INTO main(topic,printer,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;
          case "tv_hackathonfan7":
            db.query(
              "INSERT INTO main(topic,tv,ddate,ddatetext,dtime) VALUES($1,$2,$3,$4,$5)",
              [topic, data, date, datetext, time]
            );
            break;

          default:
            break;
        }

        console.log(topic, message.toString());
      } catch (error) {
        console.log(error.message);
      }
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  /*sendMessage(message) {
    this.mqttClient.publish('mytopic', message);
  }*/
}

module.exports = MqttHandler;
