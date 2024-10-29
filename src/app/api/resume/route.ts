import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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

    const newUser = await prisma.user.create({
      data: {
        email: 'sampleuser1@example.com',
        name: 'Sample User'
      }
    });
    console.log('New user created:', newUser);


    const resume = await prisma.resume.create({
      data: {
        userId: newUser.id,
        careerObjective: {
          create: {
            objective: careerObjective[0].objective,
          },
        },
        education: {
          create: education.map((edu: { collegeName: string; degreeName: string; courseStartYear: string; courseEndYear: string; currentGPA: string }) => ({
            collegeName: edu.collegeName,
            courseName: edu.degreeName,
            degreeName: edu.degreeName,
            courseStartYear: edu.courseStartYear,
            courseEndYear: edu.courseEndYear,
            currentGPA: edu.currentGPA,
          })),
        },
        workExperience: {
          create: workExperience.map((work: { organizationName: string; role: string; description: string; startDate: string; endDate: string }) => ({
            organizationName: work.organizationName,
            role: work.role,
            description: work.description,
            startMonth: work.startDate,
            endMonth: work.endDate,
            startYear: work.startDate,
            endYear: work.endDate,
            stillWorking: false
          })),
        },
        projects: {
          create: projects.map((project: { projectName: string; projectLink: string; projectDescription: string; startDate: string; month: string; year: string }) => ({
            projectName: project.projectName,
            projectLink: project.projectLink,
            projectDescription: project.projectDescription,
            month: project.month,
            year: project.year
          })),
        },
        achievements: {
          create: achievements.map((achievement: { achievement: string }) => ({
            achievement: achievement.achievement,
          })),
        },
        skills: {
          create: skills.map((skill: { skill: string }) => ({
            skill: skill.skill,
          })),
        },
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
}
