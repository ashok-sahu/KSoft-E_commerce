require("dotenv").config();
const app = require("./server/app");
const colors = require("colors");
const { staticConfig } = require("./server/configs/static.config");
const { databaseConnection } = require("./server/configs/database.config");

const PORT = process.env.PORT || 8080;
databaseConnection();
staticConfig();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`.green.bold);
});
