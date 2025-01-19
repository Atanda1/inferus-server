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

 // postgresql://inferus_db_user:ER5kkVs5F8DMN1KD2xUHPpTF5w6teGVI@dpg-cu69o3d2ng1s73bne580-a.oregon-postgres.render.com/inferus_db