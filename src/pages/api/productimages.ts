import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const upload = multer({ storage: multer.memoryStorage() });

const handler = createRouter<NextApiRequest, NextApiResponse>();

handler.use(upload.single("image"));

handler.post((req, res) => {
    return res.status(200).json({ message: "OK2" });
});

export default handler.handler();


