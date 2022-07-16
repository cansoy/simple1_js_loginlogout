const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()

router.get('/',(req,res)=>{
   const access_token=req.cookies.access_token
    if (access_token===undefined) {
        res.redirect('/login')
        return
    }
    try {
        const verifyAccessToken=jwt.verify(access_token,process.env.JWT_SECRET)
        console.log('you are in safe now!')
        res.render('home')
    } catch (error) {
        res.clearCookie('access_token')
        res.redirect('/login')
        return
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('access_token')
    res.redirect('/login')
})

module.exports=router