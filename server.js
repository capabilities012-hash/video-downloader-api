const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

// ✅ MAIN API
app.post("/api", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.json({ status: false, msg: "No URL" });
  }

  // 🔥 yt-dlp command
  const command = `yt-dlp -f best -g "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log("ERROR:", stderr);
      return res.json({ status: false });
    }

    const videoUrl = stdout.trim();

    if (!videoUrl) {
      return res.json({ status: false });
    }

    res.json({
      status: true,
      url: videoUrl
    });
  });
});

app.listen(3000, () => console.log("Server running 🚀"));
