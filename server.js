const path = require('path')
const dotenv=require('dotenv')
dotenv.config({path:path.join(__dirname,'./bin','.env')})
const express=require('express')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash =require('express-flash')
const routerLogin=require('./routes/routerLogin')
const routerHome=require('./routes/routerHome')
const server=express()

server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(cookieParser())
server.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false
}))
server.use(flash())
server.set('views',path.join(__dirname,'./views'))
server.set('view engine','ejs')

server.use('/',routerHome)
server.use('/login',routerLogin)

server.listen(process.env.PORT,process.env.HOST,()=>{
    console.log('...')
})