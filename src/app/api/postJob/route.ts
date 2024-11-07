import { NextResponse } from 'next/server';
import { PrismaClient, JobType, WorkMode, SalaryType } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '../auth/[...nextauth]/options';

const prisma = new PrismaClient();

export async function POST(req: Request) {

    console.log('Job Post Request:', req);

    const date = new Date();

    const session = await getServerSession({ req, ...AuthOptions });

    try {
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        const recruiterId = parseInt(session.id, 10);
        if (isNaN(recruiterId)) {
            return NextResponse.json({ error: 'Invalid recruiter ID' }, { status: 400 });
        }

        const jobData = {
            title: data.title as string,
            description: data.description as string,
            company: data.company as string,
            location: data.location as string,
            type: data.type as JobType,
            workMode: data.workMode as WorkMode,
            minSalary: parseFloat(data.minSalary) || 0,
            maxSalary: parseFloat(data.maxSalary) || 0,
            salaryType: data.salaryType as SalaryType,
            datePosted: date,
            recruiterId: recruiterId, 
        };

        console.log('Job Data:', jobData);

        const job = await prisma.job.create({
            data: jobData,
        });

        return NextResponse.json({
            message: "Job posted successfully!",
            job,
        });
    } catch (error) {
        console.error('Error posting job:', error);
        return NextResponse.json({ error: 'Failed to post job' }, { status: 400 });
    } finally {
        await prisma.$disconnect();
    }
}
