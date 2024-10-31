import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const { jobId, email, phone, coverLetter, resumeLink, userId } = data;

        console.log('data:', data);

        if (!jobId || !userId || !email || !phone || !coverLetter || !resumeLink) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const application = await prisma.application.create({
            data: {
                jobId: parseInt(jobId),
                applicantId: parseInt(userId),
                phone,
                coverLetter,
                resumeLink,
                email,
            },
        });

        return NextResponse.json(application, { status: 200 });
    } catch (error) {
        console.error('Error creating application:', error);
        return NextResponse.json({ message: 'Failed to create application' }, { status: 500 });
    }
}
