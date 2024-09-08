const express= require('express');
const app=express();
const router=express.Router();
const  {PrismaClient}  = require('@prisma/client');
const authmiddleware = require('../authmiddleware');
const prisma= new PrismaClient()
const jwt=require('jsonwebtoken')
const secret=require('../secret')
async function newdoctor(inputs) {
    await prisma.$connect();
    try{
        const exists=await prisma.doc.findFirst({
            where:{
                email:inputs.email
            }
        })
        if(exists){
            return {status: 409, message:"doctor already exists"}
        }
        await prisma.doc.create({
            data:{
                email:inputs.email,
                password:inputs.password,
                name:inputs.name,
                qualification:inputs.qualification
            }
        })
        return { status:200, message:"user created"}
    }catch(err){
        return {status:400, message:err}
    }finally{
        await prisma.$disconnect();
    }
}
async function gettexts(email) {
    await prisma.$connect();
    try{
        const doctor=await prisma.doc.findUnique({
            where:{
                email:email
            }
        })
        const texts=await prisma.mentaltext.findMany({
            where:{
                docid:doctor.id
            }
        })
        if(texts.length===0){
            return {status:404,message:"no text found"}
        }
        return {status:200,message:texts}
    }catch(err){
        console.log(err)
        return {status:400, message:err}
        
    }finally{
        await prisma.$disconnect();
    }
}

router.post('/newdoc',async(req,res)=>{
    const inputs=req.body;
    const response= await newdoctor(inputs)
    res.status(response.status).json(response.message)
})
router.post('/signin',authmiddleware,async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    await prisma.$connect();
    const response=await prisma.doc.findFirst({
        where:{
            email:username,
            password:password
        }
    })
    if(response){
        const userId=response.email;
        const token=jwt.sign(userId,secret)
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({response,token})
    }
    else{
        res.status(404).json("user not found")
    }
})
router.get('/fetchtexts',authmiddleware,async(req,res)=>{
    const email=req.userEmail;
    if (!email) {
        return res.status(400).json({ message: 'token is required' });
    }
    const answer=await gettexts(email)
    res.status(answer.status).json(answer.message)
})
module.exports=router;