import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const job = await prisma.job.findUnique({
      where: { id: Number(id) },
    });
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}
