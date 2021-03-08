const express = require("express");
const cors = require("cors");
const { searchTracks } = require("./src/utils/spotify");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const result = await searchTracks(query);
  res.send(result);
});

// app.get("/test", (req, res) => {
//   const key = req.query.key;
//   const data = req.query.data;
//   // console.log(query);
//   test(key, data);
// });

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
