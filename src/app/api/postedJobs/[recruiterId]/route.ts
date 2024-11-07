import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { recruiterId: string } }) {
  const { recruiterId } = params;

  try {
    console.log('Recruiter ID:', recruiterId);
    const jobs = await prisma.job.findMany({
      where: { recruiterId: Number(recruiterId) },
    });
    if (jobs.length === 0) {
      return NextResponse.json({ message: 'No jobs found for this recruiter' }, { status: 404 });
    }
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs', message: (error as Error).message }, { status: 500 });
  }
}
