const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API WORKING 🚀");
});

app.post("/api/download", (req, res) => {

    const { url } = req.body;

    if (!url) {
        return res.json({ status: false, msg: "No URL" });
    }

    // 🔥 UPDATED COMMAND (IMPORTANT)
    const command = `yt-dlp -f "best[ext=mp4]" --no-warnings --no-playlist -g "${url}"`;

    exec(command, (error, stdout, stderr) => {

        console.log("STDOUT:", stdout);
        console.log("ERROR:", stderr);

        if (error || !stdout) {
            return res.json({
                status: false,
                error: stderr || "No video found"
            });
        }

        const videoUrl = stdout.split("\n")[0].trim();

        return res.json({
            status: true,
            url: videoUrl
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
