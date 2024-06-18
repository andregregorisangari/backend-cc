const express = require("express");
const dotenv = require("dotenv");
const logs = require("./middleware/logs.js");
const authRoute = require("./route/authRoute.js");
const userRoute = require("./route/userRoute.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logs);

app.use(authRoute); // Auth
app.use(userRoute);

app.listen(`${port}`, () => {
  console.log(`Server berjalan di port ${port}`);
});
