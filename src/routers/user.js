const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

router.post('/users', async (req, res) => {  
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
        await user.save()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user : user, token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.token = req.user.token.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try{
        req.user.token = req.user.token.filter((token) => {
            return false
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => { 
    res.send(req.user)
}) 

router.patch('/users/me',auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const valid = updates.every((update)=> allowedUpdates.includes(update) )
    if(!valid){
        return res.status(400).send({error:'Invalid Update!'})
    }
    try{
        updates.forEach((update) => {
        req.user[update]  = req.body[update]    //we are using bracket notation bcz value is coming dynamiclly otrwse we can use user.name or user.password or whatever
    })
        await req.user.save()

        res.send(req.user) 
    }catch (e){
        res.status(400).send(e)
    }
} )

router.delete('/users/me', auth, async (req,res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

const upload = multer({
    dest: 'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpge)$/)){    //match provide regular expression here between /----/
            return cb(new Error('File must be in .jpg format'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('upload'), async (req,res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message 
    })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router