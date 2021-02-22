const express = require("express");

//Initiliazations
const app = express();

//Settings
app.set("PORT", process.env.PORT || 3000);
//Middlewares

//Global Variables

// Routes

//Static Files

//Server is listenning
app.listen(app.get("PORT"), () => {
  console.log("Server on port", app.get("PORT"));
});
