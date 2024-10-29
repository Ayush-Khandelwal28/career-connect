import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const userId = 1; 

        const resume = await prisma.resume.findUnique({
            where: { userId },
            include: {
                careerObjective: true,
                education: true,
                workExperience: true,
                projects: true,
                achievements: true,
                skills: true,
            },
        });

        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error('Error fetching resume data:', error);
        return NextResponse.json({ error: 'Failed to fetch resume data' }, { status: 500 });
    }
}
