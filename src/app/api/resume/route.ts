import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/app/api/auth/[...nextauth]/options'
import { CareerObjectiveInterface, EducationInterface, ProjectInterface, WorkExperienceInterface, AchievementInterface, SkillInterface } from '@/types';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      careerObjective,
      education,
      workExperience,
      projects,
      achievements,
      skills
    } = await req.json();

    console.log('Incoming data:', { careerObjective, education, workExperience, projects, achievements, skills });

    if (!careerObjective || !education || !workExperience || !projects || !achievements || !skills) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const session = await getServerSession(AuthOptions);
    const userId = session?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const resume = await prisma.resume.upsert({
      where: { userId: parseInt(userId) },
      update: {
        careerObjective: {
          deleteMany: {},
          create: careerObjective.map((obj: CareerObjectiveInterface) => ({
            objective: obj.objective,
          })),
        },
        education: {
          deleteMany: {},
          create: education.map((edu: EducationInterface) => ({
            collegeName: edu.collegeName,
            courseName: edu.degreeName,
            degreeName: edu.degreeName,
            courseStartYear: edu.courseStartYear,
            courseEndYear: edu.courseEndYear,
            currentGPA: edu.currentGPA,
          })),
        },
        workExperience: {
          deleteMany: {},
          create: workExperience.map((work: WorkExperienceInterface) => ({
            organizationName: work.organizationName,
            role: work.role,
            description: work.description,
            startMonth: work.startMonth,
            endMonth: work.endMonth,
            startYear: work.startYear,
            endYear: work.endYear,
            stillWorking: work.stillWorking,
          })),
        },
        projects: {
          deleteMany: {},
          create: projects.map((project: ProjectInterface) => ({
            projectName: project.projectName,
            projectLink: project.projectLink,
            projectDescription: project.projectDescription,
            month: project.month,
            year: project.year,
          })),
        },
        achievements: {
          deleteMany: {},
          create: achievements.map((achievement: AchievementInterface) => ({
            achievement: achievement.achievement,
          })),
        },
        skills: {
          deleteMany: {},
          create: skills.map((skill: SkillInterface) => ({
            skill: skill.skill,
          })),
        },
      },
      create: {
        userId: parseInt(userId),
        careerObjective: {
          create: { objective: careerObjective[0].objective },
        },
        education: {
          create: education.map((edu: EducationInterface) => ({
            collegeName: edu.collegeName,
            courseName: edu.degreeName,
            degreeName: edu.degreeName,
            courseStartYear: edu.courseStartYear,
            courseEndYear: edu.courseEndYear,
            currentGPA: edu.currentGPA,
          })),
        },
        workExperience: {
          create: workExperience.map((work: WorkExperienceInterface) => ({
            organizationName: work.organizationName,
            role: work.role,
            description: work.description,
            startMonth: work.startMonth,
            endMonth: work.endMonth,
            startYear: work.startYear,
            endYear: work.endYear,
            stillWorking: work.stillWorking,
          })),
        },
        projects: {
          create: projects.map((project: ProjectInterface) => ({
            projectName: project.projectName,
            projectLink: project.projectLink,
            projectDescription: project.projectDescription,
            month: project.month,
            year: project.year,
          })),
        },
        achievements: {
          create: achievements.map((achievement: AchievementInterface) => ({
            achievement: achievement.achievement,
          })),
        },
        skills: {
          create: skills.map((skill: SkillInterface) => ({
            skill: skill.skill,
          })),
        },
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating resume:', error);
    return NextResponse.json({ error: 'Failed to create/update resume' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const session = await getServerSession(AuthOptions);
    const userId = session?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { userId: parseInt(userId) },
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

    return NextResponse.json(resume, { status: 200 });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}
