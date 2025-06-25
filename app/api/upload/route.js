import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Buffer } from "buffer";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file");
    const senderEmail = formData.get("senderEmail");
    const receiverEmail = formData.get("receiverEmail");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const uploadedFiles = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      };

      try {
        await s3.send(new PutObjectCommand(uploadParams));

        const savedFile = await prisma.file.create({
          data: {
            name: file.name,
            s3Key: fileName,
            size: file.size,
            mimeType: file.type,
            senderEmail,
            receiverEmail,
            subject,
            message,
          },
        });

        uploadedFiles.push(savedFile);
      } catch (error) {
        return NextResponse.json({ error: "File upload or save failed" }, { status: 500 });
      }
    }

    return NextResponse.json({ files: uploadedFiles }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
