import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const outputDir = path.join(process.cwd(), 'public', 'generated');

export async function POST(request: Request) {
  try {
    const { texContent } = await request.json();
    const texFilePath = path.join(outputDir, 'resume.tex');

    // Step 1: Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Step 2: Write .tex content to a file
    await fs.writeFile(texFilePath, texContent);

    // Step 3: Upload to S3
    const bucketName = process.env.AWS_BUCKET_NAME || '';
    const key = `resumes/${Date.now()}-resume.tex`;
    
    const fileContent = await fs.readFile(texFilePath);
    
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: 'application/x-tex',
      })
    );

    const s3Url = `https://${bucketName}.s3.amazonaws.com/${key}`;

    

    // Return both URLs
    return NextResponse.json({
      texUrl: s3Url
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate and upload file' },
      { status: 500 }
    );
  }
}