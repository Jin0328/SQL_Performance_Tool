const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
    try {
        const conn = await pool.getConnection();


        // 쿼리 값 읽어 옴
        const [handlerReadKey] = await conn.query("SHOW SESSION STATUS LIKE 'Handler_read_key'");
        const [queryCost] = await conn.query("SHOW STATUS LIKE 'Last_query_cost'");

        conn.release();

        res.json({
        success: true,
        resources: {
            handler_read_key: handlerReadKey[0]?.Value || 0,
            query_cost: queryCost[0]?.Value || 0
        }
        });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

module.exports = router;
