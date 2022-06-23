const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const apikey = process.env.LASTFM_API_KEY;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/my-portfolio", (req, res) => {
  res.sendFile(__dirname + "/public/html/portfolio.html");
});

app.get("/api/currently-playing", (req, res) => {
  const url =
    "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kiranpl&api_key=" +
    apikey +
    "&format=json";
  const request = require("request");
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      //   console.log(data.recenttracks.track[0]);
      if (data.recenttracks.track[0]["@attr"] == undefined) {
        res.status(418).send("No song playing");
      } else {
        const track = data.recenttracks.track[0];
        const artist = track.artist["#text"];
        const song = track.name;
        const album = track.album["#text"];
        const image = track.image[3]["#text"];
        res.send({ artist, song, album, image });
      }
    } else {
      console.log(error);
      res.json({ error: true, message: "Error fetching data" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port} !`);
});
