const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API RUNNING 🚀");
});

// 🔥 MAIN API
app.post("/api/download", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.json({ status: false, msg: "No URL" });
        }

        // 🔥 Instagram FIX
        if (url.includes("instagram.com")) {

            const apiUrl = `https://snapinsta.app/action.php`;

            const response = await axios.post(apiUrl,
                new URLSearchParams({
                    url: url
                }),
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const html = response.data;

            const match = html.match(/href="(https:\/\/[^"]+\.mp4[^"]*)"/);

            if (match) {
                return res.json({
                    status: true,
                    url: match[1]
                });
            } else {
                return res.json({ status: false });
            }
        }

        return res.json({ status: false });

    } catch (err) {
        return res.json({
            status: false,
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
