const express = require("express");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).send("Invalid YouTube URL");
  }

  const stream = ytdl(videoURL, { quality: "highestaudio" });

  res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');

  ffmpeg(stream)
    .audioBitrate(128)
    .format("mp3")
    .pipe(res, { end: true });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
