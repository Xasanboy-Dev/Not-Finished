const { Router } = require("express")
const router = Router()
const Pool = require("pg").Pool
const DATABASE = "users"
const TABLE = "xasanboy"
const fs = require('fs')
const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    database: DATABASE,
    port: 5432
})
const you = `DATA`
// Get method
router.get("/", async (req, res) => {
    try {
        const users = await pool.query(`SELECT * FROM ${TABLE}`)
        res.status(200).send()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Post method
router.post("/", async (req, res) => {
    const users = await pool.query(`SELECT * FROM ${TABLE}`)
    try {
        const body = req.body
        if (body.name !== undefined && body.lastname !== undefined && body.email !== undefined && body.gender !== undefined && body.country !== undefined) {
            let ready = users.rows
            let arr = ready.filter(value => value.name == body.name && value.lastname == body.lastname && value.email == body.email && value.gender == body.gender && value.country == body.country)
            if (arr.length == 0) {
                await pool.query(`INSERT INTO ${TABLE} (name,lastname,email,gender,country) VALUES ($1,$2,$3,$4,$5)`, [body.name, body.lastname, body.email, body.gender, body.country])
                return res.status(201).json({ message: `Your ${you} has created` })
            }
        }
        res.status(400).json({ message: `In your ${you} has a problem!` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Delete method
router.delete("/:id", async (req, res) => {
    try {
        await pool.query(`DELETE FROM ${TABLE} WHERE id = $1`, [req.params.id])
        res.status(200).json({ message: `Your ${you} has deleted!` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Get users by ID
router.get('/:id', async (req, res) => {
    try {
        res.status(200).json((await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [req.params.id])).rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Edit user
router.put('/:id', async (req, res) => {
    try {
        let arr = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [req.params.id])
        const { name, lastname, email, gender, country } = req.body
        if (arr.rows.length == 0) {
            return res.status(400).json({ message: `In your ID has a problem` })
        } else {
            const id = await pool.query(`SELECT * FROM ${TABLE} WHERE id = $1`, [req.params.id])
            await pool.query(`UPDATE ${TABLE} SET name = $1,lastname = $2,email = $3,gender = $4,country = $5,id = $7 WHERE id = $6`, [
                name ? name : id.rows[0].name,
                lastname ? lastname : id.rows[0].lastname,
                email ? email : id.rows[0].email,
                gender ? gender : id.rows[0].gender,
                country ? country : id.rows[0].country,
                req.params.id,
                arr.rows[0].id
            ])
            res.status(200).json({ message: `Your ${you} edited succesfully!` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})
module.exports = router