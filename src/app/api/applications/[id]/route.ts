import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract job id from the URL parameters

  try {
    const applications = await prisma.application.findMany({
      where: { jobId: Number(id) }, // Fetch applications where jobId matches the provided id
      include: {
        applicant: true, // Include applicant details if your schema has a relation
      },
    });

    if (applications.length === 0) {
      return NextResponse.json({ message: 'No applications found for this job' }, { status: 404 });
    }

    return NextResponse.json(applications); // Return the fetched applications
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
