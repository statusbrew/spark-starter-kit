import javascriptBarcodeReader from "javascript-barcode-reader";
import express from "express";
const router = express.Router();
const multer = require("multer");
import sizeOf from "image-size"; 
var maxSize = 400 * 1000 * 1000;
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});
const singleUpload = upload.single('imageFile');

router.post("/",singleUpload,async (req,res)=>{
    console.log(req.file);
  
    try {
       
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const imageBuffer = req.file.buffer;
        const dimensions = sizeOf(imageBuffer);
        const { width, height } = dimensions;
        const result = await javascriptBarcodeReader({
          image:imageBuffer,
          width: width,
          height: height,
          barcode: "code-39",      
        });

        res.json({ barcodeResult: result });
      } catch (error) {
        console.error("Error processing barcode:", error);
        res.status(500).json({ error: "Failed to process barcode" });
      }
    });
module.exports = router;
