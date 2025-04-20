// /pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "senin_cloud_name",
  api_key: "senin_api_key",
  api_secret: "senin_api_secret",
});

// Multer belleğe alacak şekilde ayarlanıyor
const upload = multer({ storage: multer.memoryStorage() });

const apiRoute = createRouter<NextApiRequest, NextApiResponse>();

// 👇️ Mutlaka cast et, yoksa TypeScript ağlıyor
apiRoute.use(upload.single("image") as any);

apiRoute.post(async (req: any, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    return res.status(200).json({ message: "Uploaded", result });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute.handler();
