import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const file = await prisma.file.findUnique({
      where: { id: id }
    });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.s3Key,
    };

    try {
      const command = new GetObjectCommand(getObjectParams);
      const response = await s3.send(command);
      
      const chunks = [];
      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      const headers = new Headers();
      headers.set('Content-Disposition', `attachment; filename="${file.name}"`);
      headers.set('Content-Type', file.mimeType || 'application/octet-stream');
      headers.set('Content-Length', fileBuffer.length.toString());

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: headers
      });

    } catch (s3Error) {
      console.error('S3 download error:', s3Error);
      return NextResponse.json({ error: 'File not accessible' }, { status: 404 });
    }

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
