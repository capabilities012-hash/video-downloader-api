const express = require("express");
const cors = require("cors");
const youtubedl = require("yt-dlp-exec");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API WORKING 🚀");
});

app.post("/api", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.json({ status: false, msg: "No URL" });
    }

    const result = await youtubedl(url, {
      getUrl: true,
      format: "best"
    });

    res.json({
      status: true,
      url: result
    });

  } catch (e) {
    console.log(e);
    res.json({ status: false, msg: "Error" });
  }
});

app.listen(3000, () => console.log("Server running"));
