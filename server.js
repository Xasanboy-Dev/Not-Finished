const express = require("express")
const server = express()
const Pool = require("pg").Pool
const path = require("path")

const pool = new Pool({
    name: "postgres",
    port: 5432,
    host: "localhost",
    database: "jalol",
    user: "postgres",
    password: "1234"
})



const PORT = 8080
server.use(express.json())
server.use("/api", require("./functions/index"))
server.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`)
})