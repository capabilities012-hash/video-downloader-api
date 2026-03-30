const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/api", async (req, res) => {
    try {
        const url = req.body.url;

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const html = response.data;

        const match = html.match(/"video_url":"([^"]+)"/);

        if (!match) {
            return res.json({ status: false });
        }

        const videoUrl = match[1]
            .replace(/\\u0026/g, "&")
            .replace(/\\\//g, "/");

        res.json({
            status: true,
            url: videoUrl
        });

    } catch (e) {
        res.json({ status: false });
    }
});

app.listen(3000, () => console.log("Server running"));
