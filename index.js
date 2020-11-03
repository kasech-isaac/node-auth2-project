const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
cookieParser=require("cookie-parser")
const usersRouter = require("./users/usersRouther")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(usersRouter)



server.use((err, req, res, next) => {
res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})