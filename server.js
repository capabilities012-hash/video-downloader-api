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

    // 🔥 yt-dlp command
    const command = `yt-dlp -f best -g "${url}"`;

    exec(command, (error, stdout, stderr) => {

        if (error) {
            return res.json({
                status: false,
                error: stderr
            });
        }

        const videoUrl = stdout.trim();

        if (!videoUrl) {
            return res.json({ status: false });
        }

        return res.json({
            status: true,
            url: videoUrl
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
