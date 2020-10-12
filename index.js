const config = require("config");
const mongoose = require("mongoose");
const { usersRoute } = require("./routes/user.route");
const express = require("express");
const app = express();

if (!config.get("privatekey")) {
  console.error("FATAL ERROR: privatekey not found");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/nodeauth", { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDb'))
  .catch(() => console.log('Could not connect to MongoDb'));

app.use(express.json());
app.use('api/routers', usersRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));