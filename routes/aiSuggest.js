const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.post("/", async (req, res) => {
    const { query } = req.body;
    const prompt = `다음 MySQL 쿼리를 성능 최적화해주세요. 쿼리의 내용 자체는 분석하지 않습니다. 간단하게 고려할 사항을 4줄 정도로 작성해
    주세요. 그리고 같은 기능을 수행하되 성능이 뛰어날 것으로 예측되는 쿼리를 알려주세요. \n쿼리: ${query}`;

    try {
        const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
            contents: [
            {
                parts: [
                { text: prompt }
                ]
            }
            ]
        },
        {
            headers: { "Content-Type": "application/json" },
            params: { key: process.env.GEMINI_API_KEY }
        }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "추천 실패";
    res.json({ success: true, suggestion: result });
    } catch (err) {
        console.error("Gemini API Error:", err.message);
        res.json({ success: false, error: err.message });
    }
});

module.exports = router;