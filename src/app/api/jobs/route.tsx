import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all jobs
export async function GET() {
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error("❌ Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST: Add a new job
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const job = await prisma.job.create({
      data: {
        company: body.company,
        title: body.title,
        location: body.location,
        deadline: body.deadline,
        salary: body.salary,
        shortdescription: body.shortdescription,
      },
    });

    return NextResponse.json(job, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}

// DELETE: Remove a job by ID (expects ?id=123 in the URL)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    await prisma.job.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    console.error("❌ Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
