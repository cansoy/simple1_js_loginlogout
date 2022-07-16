const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()

router.get('/',(req,res)=>{
    const access_token=req.cookies.access_token
    if (access_token!==undefined) {
        res.redirect('/')
        return
    }
    const wrongPassword=req.flash('msg')
    res.render('login',{wrong:wrongPassword})
})

router.post('/logged',(req,res)=>{
    const user={
        username:req.body.username,
        password:req.body.password
    }
    if (user.password!=='123') {
        req.flash('msg','you used wrong password!')
        res.redirect('/login')
        return
    }
    const objToken={
        username:user.username,
        stamp:new Date().getTime()
    }
    const token=jwt.sign(objToken,process.env.JWT_SECRET)
    res.cookie('access_token',token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.redirect('/')
})


module.exports=router