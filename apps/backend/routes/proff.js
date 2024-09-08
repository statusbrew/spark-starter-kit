// const express= require('express');
// const app=express();
// const router=express.Router();
// const multer=require('multer')
// const upload = multer({ dest: 'uploadscancer/' });
// const path = require('path');
// const { spawn } = require('child_process');
// const fs = require('fs');
// router.post('/cancerupload', upload.single('image'), (req, res) => {
//     const image_path = path.resolve(process.cwd(), 'uploadscancer', req.file.filename);
//     const script = path.resolve(process.cwd(),  'breast_cancer.py');

//     // Spawn the Python script for breast cancer prediction
//     const prediction=spawn('poetry', ['run', 'python', script, ...image_path])

//     let datap = '';

//     // Capture data from the Python script
//     prediction.stdout.on('data', (data) => {
//         datap += data.toString();
//     });

//     // When the process ends, send the response
//     prediction.stdout.on('end', () => {
//         console.log(datap);  // Log the prediction result
//         if (!res.headersSent) {
//             fs.unlinkSync(image_path); // Clean up the uploaded file
            
//             // Ensure the prediction is valid JSON
//             try {
//                 res.json({ result: datap.trim() });
//             } catch (err) {
//                 res.status(500).json({ error: 'Failed to process prediction result.' });
//             }
//         }
//     });

//     // Handle potential errors from the Python script
//     prediction.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Error processing image.' });
//         }
//     });

//     prediction.on('error', (error) => {
//         console.error(`Error starting Python script: ${error}`);
//         res.status(500).json({ error: 'Failed to start Python script.' });
//     });
// });
// module.exports=router;