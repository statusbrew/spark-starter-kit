const express= require('express');
const app=express();
const router=express.Router();
const multer=require('multer')
const OpenAI = require('openai');
const client = new OpenAI({
    apiKey: "sk-RZu_sJuGQa0t7VhW6KzhL177q-AVOfQWkTFFSe9v-zT3BlbkFJIiYaXfZkzouEbR68TDWq6rSV5ycpMmthP439BXavIA", // This is the default and can be omitted
});
const secret=require('../secret')

const jwt=require('jsonwebtoken')
const cors=require('cors')
const path=require('path')
const  {PrismaClient, Prisma}  = require('@prisma/client')
const prisma= new PrismaClient()
const fs=require('fs')
const {spawn}=require('child_process');
const authmiddleware = require('../authmiddleware');
router.use(express.json());
const upload = multer({ dest: 'uploads/' });
router.use(cors())
async function createuser(inputs) {
    await prisma.$connect();
    try{
        const exists=await prisma.user.findFirst({
            where:{
                email:inputs.email
            }
        })
        if(exists){
            return {status: 409, message:"user already exists"}

        }
        await prisma.user.create({
            data:{
                email:inputs.email,
                password:inputs.password,
                name:inputs.name,
                age:inputs.age,
                gender:inputs.gender
            }
        })
        return { status:200, message:"user created"}
    }catch(err){
        return {status:400, message:err}
    }finally{
        await prisma.$disconnect();
    }
}

async function newmentaltext(input,email) {
    await prisma.$connect();
    try{
        const totaldoc=await prisma.doc.count();
        if (totaldoc===0){
            return {status:404, message:"no doct registered yet"}
        }
        const randomDoc = await prisma.$queryRaw`SELECT * FROM "Doc" ORDER BY RANDOM() LIMIT 1`;
        const doc=randomDoc[0]
        const newMentaltext = await prisma.mentaltext.create({
            data: {
                docid: doc.id,
                text: input.text,
                useremail:email
            }
        });
        console.log(newMentaltext)
        return {status:200,message:"text sent to doc"}
    }catch(err){
        console.log(err)
        return {status:500, message:'server error'}
    }finally{
        await prisma.$disconnect();
    }
}
router.post('/signup',async (req,res)=>{
    const inputs=req.body;
    const response= await createuser(inputs)
    res.status(response.status).json(response.message)
})
router.post('/signin',async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    await prisma.$connect();
    const response=await prisma.user.findFirst({
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

router.post('/uploadliver',upload.array('image',3),async(req,res)=>{
    const image_path = req.files.map(file => path.resolve('uploads', file.filename));
    console.log('Files uploaded:', req.files);
    console.log('Resolved image paths:', image_path);
    const script=path.resolve(__dirname,'..','OCR_script_liver.py')
    // apps/backend/OCR_script_liver.py
    // apps/backend/routes/user.js
    const process=spawn('poetry', ['run', 'python', script, ...image_path])
    console.log(image_path)
    let allextracted=[];
    // let processedimage=0
    let extracted=''
    let responseSent = false;
    process.stdout.on('data',(data)=>{
        extracted += data.toString()
    })
    process.stdout.on('end', () => {
        if (!responseSent) {
            try{
            const parsedData = JSON.parse(extracted);
            const responseData = Array.isArray(parsedData) ? parsedData : [parsedData];
            image_path.forEach(file => fs.unlinkSync(file));
            console.log(responseData)
            res.json(responseData)
            responseSent=true
        } catch (error) {
            console.error(`JSON parse error: ${error.message}`);
            res.status(500).send('Error processing images');
        }
    }});
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        if (!responseSent) {
            res.status(500).send('Error processing images');
            responseSent = true;
        }
        console.log({"extracted":extracted})
        console.log({"allextracted":allextracted})
    });
    process.on('error', (error) => {
        console.error(`Process error: ${error}`);
        if (!responseSent) {
            res.status(500).send('Error running script');
            responseSent = true;
        }
    });
})
router.post('/uploadblood',authmiddleware,upload.array('image',3),async(req,res)=>{
    const image_path = req.files.map(file => path.resolve('uploads', file.filename));
    const script=path.resolve(__dirname,'..','OCR_script_blood.py')
    const process=spawn('poetry', ['run', 'python', script, ...image_path])
    let allextracted=[];
    // let processedimage=0
    let extracted=''
    let responseSent = false;
    process.stdout.on('data',(data)=>{
        extracted += data.toString()
    })
    process.stdout.on('end', () => {
        try {
            const parsedData = JSON.parse(extracted);
            allextracted.push(parsedData);
            image_path.forEach(file => fs.unlinkSync(file));
            // processedimage += 1;
            
            
            res.json(allextracted);
            responseSent=true
        } catch (error) {
            console.error(`JSON parse error: ${error.message}`);
            res.status(500).send('Error processing images');
        }
    });
    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        if (!responseSent){
            res.status(500).send('Error processing images');
        }
    });
})
router.get('/fetchbloodreports',authmiddleware,async(req,res)=>{
    //reports fetch krniyaan
    const email=req.userEmail;
    await prisma.$connect();
    try{
        const userId=await prisma.user.findUnique({
            where:{email:email}
        })
        const reports=await prisma.bloodReport.findMany({
            where:{
                userId:userId.id
            }
        })
        console.log(reports)
        res.status(200).json(reports)
    }catch(err){
        res.status(500).json(err)
    }finally{
        await prisma.$disconnect();
    }
})
async function bloodopenaiapi(vitalsArray,age,gender){
    if (!vitalsArray || vitalsArray.length === 0) {
        return { status: 400, message: "No vitals data provided" };
    }

    const vitals = vitalsArray[0]
    try {
        console.log("Vitals:", vitals);
        console.log("Age:", age);
        console.log("Gender:", gender);
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful medical assistant capable of interpreting medical reports based on patient vitals, age, and gender. Provide a clear and concise summary with actionable insights." },
                {
                    role: "user",
                    content: `The patient is a ${age}-year-old ${gender}. Here are the blood test vitals: 
                    - Hemoglobin: ${vitals.hemoglobin} g/dL
                    - RBC: ${vitals.rbcCount} million cells/uL
                    - Differential Lymphocyte count: ${vitals.lymphocytes} cells/uL
                    - MCV: ${vitals.mcv} fL
                    Please provide just a brief summary of this report such that a person with no knowledge about these vital levels can understand,also suggest some tips to improve overall health.`,
                },
            ],
        });
        const content = completion.choices[0].message.content;
        console.log(content)
        return { status: 200, message: content };
    } catch (error) {
        return {status:500,message:error}
    }
}
async function putliver(email,vital,summary,date) {
    await prisma.$connect();
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!user) {
            return { status: 404, message: "User not found" };
        }
        const new_liver=await prisma.liverReport.create({
            data:{
                user:{
                    connect: { id: user.id }, // Correct way to connect the user relation
                },
                SGPT:vital.SGPT,
                SGOT:vital.SGOT,
                GGTP:vital.GGTP,
                Protein:vital.Protein,
                Albumin:vital.Albumin,
                Globulin:vital.Globulin,
                reportDate:date,
                summary:summary
            }

        })
        return {status:200,message:"Summary and data added"}
    }catch(err){
        return {status:500,message:err}
    }finally{
        await prisma.$disconnect();
    }
}
async function putblood(email,vital,summary,date) {
    await prisma.$connect();
    try{
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!user) {
            return { status: 404, message: "User not found" };
        }
        const new_blood=await prisma.bloodReport.create({
            data:{
                user:{
                    connect: { id: user.id }, // Correct way to connect the user relation
                },
                hemoglobin :vital.hemoglobin,
                packedCellVolume :vital.hemoglobin,
                rbcCount :vital.rbcCount,
                mcv :vital.mcv,
                lymphocytesDiff :vital.lymphocytesDiff,
                neutrophils :vital.neutrophils,
                lymphocytes :vital.lymphocytes,
                reportDate:date,
                summary:summary
            }
        })
        return {status:200,message:"Summary and data added"}
    }catch(err){
        return {status:500,message:err}
    }finally{
        await prisma.$disconnect();
    }
}

async function liveropenaiapi(vitalsArray,age,gender){
    if (!vitalsArray || vitalsArray.length === 0) {
        return { status: 400, message: "No vitals data provided" };
    }

    const vitals = vitalsArray[0]
    try {
        console.log("Vitals:", vitals);
        console.log("Age:", age);
        console.log("Gender:", gender);
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful medical assistant capable of interpreting medical reports based on patient vitals, age, and gender. Provide a clear and concise summary with actionable insights." },
                {
                    role: "user",
                    content: `The patient is a ${age}-year-old ${gender}. Here are the blood test vitals: 
                    - SGOT: ${vitals.SGOT},
                    - SGPT: ${vitals.SGPT},
                    - CCGTP: ${vitals.GGTP},
                    - Protein: ${vitals.Protein},
                    - Albumin: ${vitals.Albumin},
                    - Globulin: ${vitals.Globulin},
                    Please provide just a brief summary of this report such that a person with no knowledge about these vital levels can understand,also suggest some tips to improve overall health.`,
                },
            ],
        });
        const content = completion.choices[0].message.content;
        console.log(content)
        return { status: 200, message: content };
    } catch (error) {
        return {status:500,message:error}
    }
}
async function findusergenderage(email) {
    await prisma.$connect();
    try{
        const finduser=await prisma.user.findFirst({
            where:{
                email:email
            }
        })
        
        return {status:200,age:finduser.age,gender:finduser.gender}
    }catch(err){
        return {status:404,message:"user not found"}
    }finally{
        await prisma.$disconnect();
    }
}
router.post('/liversummarize',authmiddleware,async(req,res)=>{
    const vitals=req.body;
    const email=req.userEmail;
    const vital=vitals[0]
    const date=vital.date
    const response = await findusergenderage(email);
    if (response.status === 200) {
        const airesponse = await liveropenaiapi(vitals, response.age, response.gender);
        const finalresponse=await putliver(email,vital,airesponse.message,date)
        console.log(finalresponse)
        res.json(airesponse.message);
        
    } else {
        res.status(404).json({ message: "User not found" });
    }
})
router.post('/bloodsummarize',authmiddleware,async(req,res)=>{
    const vitals=req.body;
    const email=req.userEmail;
    const response = await findusergenderage(email);
    const vital=vitals[0]
    const date=vital.date
    if (response.status === 200) {
        const airesponse = await bloodopenaiapi(vitals, response.age, response.gender);
        const finalresponse=await putblood(email,vital,airesponse.message,date)
        console.log(finalresponse)
        res.json(airesponse.message);
    } else {
        res.status(404).json({ message: "User not found" });
    }
})
router.post('/mentaltext',authmiddleware,async(req,res)=>{
    const text=req.body;
    const email=req.userEmail
    const response = await newmentaltext(text,email)
    res.status(response.status).json(response.message)
})
module.exports = router;