const express = require('express')
const router = new express.Router()
const app  = express()

router.get('/test', (req,res)=>{
    res.send("hii I m Manish")
})

app.use(router)


-------------------------------------------------------------------------------------------------

app.post('/person', async (req,res)=>{ // return promise using async
    console.log(req.body)
    const user = new User(req.body) //promise already
try{
    await user.save()
    res.status(201).send(user)
}catch(e){
    res.status(400).send(e)
}
    // user.save().then( ()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})