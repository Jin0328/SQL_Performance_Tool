// routes/explain.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
    const { query } = req.body;
    try {
        const explainQuery = `EXPLAIN ${query}`;
        const [rows] = await pool.query(explainQuery);
        res.json({ success: true, plan: rows });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

module.exports = router;
