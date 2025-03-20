const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
    const { query } = req.body;
    try {
        const conn = await pool.getConnection();

        // 쿼리 실행 시간 기록
        const start = Date.now();
        await conn.query(query);
        const end = Date.now();
        const elapsed = end - start;

        const [rowsExamined] = await conn.query("SHOW SESSION STATUS LIKE 'Rows_examined'");
        const [rowsSent] = await conn.query("SHOW SESSION STATUS LIKE 'Rows_sent'");
        const [handlerReadKey] = await conn.query("SHOW SESSION STATUS LIKE 'Handler_read_key'");
        const [queryCost] = await conn.query("SHOW STATUS LIKE 'Last_query_cost'");

        conn.release();

        res.json({
            success: true,
            time: elapsed,
            resources: {
                handler_read_key: handlerReadKey[0]?.Value || 0,
                query_cost: queryCost[0]?.Value || 0
            }
        });
    } catch (error) {
        console.error("Query Error:", error);
        res.json({ success: false, error: error?.message || error?.toString() || "Unknown error occurred" });
    }
});

module.exports = router;