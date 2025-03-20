const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
    const { query } = req.body;
    try {
        // 사용자 쿼리 시간 측정
        const start = Date.now();
        await pool.query(query);
        const end = Date.now();
        // 종료 시간에서 시작 시간을 빼서 흐른 시간 구함
        const elapsed = end - start;
        res.json({ success: true, time: elapsed });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;