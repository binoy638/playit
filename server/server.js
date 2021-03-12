const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const cors = require("cors");
const { searchTracks, newRelease, topTracks } = require("./src/utils/spotify");
const { infoFromQuery } = require("./src/utils/youtube");
const app = express();
require("dotenv").config();
const client = new MongoClient(process.env.ATLAS_URI);
const port = process.env.PORT || 5000;

app.use(cors());
let collection;
app.get("/test", async (req, res) => {
  try {
    let result = await collection
      .aggregate([
        {
          $search: {
            autocomplete: {
              query: `${req.query.query}`,
              path: "artist",
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        },
        { $sort: { popularity: -1 } },
        {
          $limit: 5,
        },
      ])
      // .find({ name: "Numb" })
      .toArray();

    res.send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const result = await searchTracks(query);
  res.send(result);
});

app.get("/new-release", async (req, res) => {
  const result = await newRelease();
  res.send(result);
});

app.get("/top-tracks", async (req, res) => {
  const result = await topTracks();

  res.send(result);
});

// app.get("/test", (req, res) => {
//   const key = req.query.key;
//   const data = req.query.data;
//   // console.log(query);
//   test(key, data);
// });

app.get("/videoid", async (req, res) => {
  const query = req.query.query;
  const trackInfo = await infoFromQuery(query);
  res.send(trackInfo);
});

app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
  try {
    await client.connect({
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    collection = client.db("playit").collection("Tracks");
  } catch (e) {
    console.error(e);
  }
});
