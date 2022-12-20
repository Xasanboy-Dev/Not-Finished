const { Router } = require("express")
const router = Router()
const { Client } = require("pg")
const pool = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "xasanboy"
});
pool.connect()

const table = require("../server")
router.get("/", async (req, res) => {
    try {
        const all = await pool.query(`SELECT * FROM xasanboy`)
        res.status(200).json(all.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router