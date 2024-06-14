// index.js
const express = require("express");
const app = express();
const cron = require("node-cron");

const generateTargetReports = () => {
  console.log("Generating target reports");
  console.log("Target reports generated successfully");
  console.log("Sending target reports to sales executives");
  console.log("Target reports sent successfully");
};

app.get("/send-target-reports", (req, res) => {
  console.log("Sending target reports to sales executives");
  res.send("Target reports sent successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

cron.schedule("0 17 * * 5", generateTargetReports);
