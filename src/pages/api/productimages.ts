import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.v2.config(
    {
        cloud_name:"",
        api_key:"",
        api_secret:""
    }
)

const upload = multer({ storage: multer.memoryStorage() });

const handler = createRouter<NextApiRequest, NextApiResponse>();

handler.use(upload.single("image") as any);

handler.post(async (req:any, res:any) => {
    console.log(req);

   // if(!req.file)
     //   return res.status(400).json({ error: "No file uploaded" });

   const result = await new Promise((resolve,reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
             {folder: "products"},
             (error,result) => {
                if (error) reject(error);
                else resolve(result);
             }
        )
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
   });

   console.log(result);


    return res.status(200).json({ message: "OK2" });
});

export default handler.handler();


