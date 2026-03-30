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
      return res.json({ status: false });
    }

    const result = await youtubedl(url, {
      getUrl: true,
      format: "best"
    });

    return res.json({
      status: true,
      url: result
    });

  } catch (err) {
    console.log(err);
    return res.json({ status: false });
  }
});

app.listen(3000, () => console.log("Server running 🚀"));
