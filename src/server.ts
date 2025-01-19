const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.send({ message: "Hello World!" });
});

app.listen(3000, () => { 
    console.log("Server is running on port 3000, http://localhost:3000");
});

module.exports = app;  