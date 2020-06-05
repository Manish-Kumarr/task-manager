const express = require('express')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json()) //Data coming in json format so this line convert json to object
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server run at " + port)
})


