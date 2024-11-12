import { ResumeData } from "../../types/index"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Target,
  Trophy,
  Wrench,
  FolderGit2,
} from "lucide-react";

interface ResumeViewProps {
  resumeData: ResumeData;
}

export default function ResumeView({ resumeData }: ResumeViewProps) {
  console.log(resumeData);
  return (
    <div className="space-y-6">
      {/* Career Objective */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Career Objective
        </h3>
        <Card className="p-4">
          <p className="text-gray-600 dark:text-gray-300">
            {resumeData.careerObjective[0]?.objective}
          </p>
        </Card>
      </section>

      {/* Education */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Education
        </h3>
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-semibold">{edu.degreeName}</h4>
              <h4 className="font-semibold">{edu.courseName}</h4>
              <p className="text-gray-600 dark:text-gray-300">{edu.collegeName}</p>
              <p className="text-sm text-gray-500">
                {edu.courseStartYear} - {edu.courseEndYear}
              </p>
              <p className="text-sm">GPA: {edu.currentGPA}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </h3>
        <div className="space-y-4">
          {resumeData.workExperience.map((work, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-semibold">{work.role}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {work.organizationName}
              </p>
              <p className="text-sm text-gray-500">
                {work.startMonth} {work.startYear} -{" "}
                {work.stillWorking
                  ? "Present"
                  : `${work.endMonth} ${work.endYear}`}
              </p>
              <p className="mt-2 text-sm">{work.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FolderGit2 className="w-5 h-5" />
          Projects
        </h3>
        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-semibold">{project.projectName}</h4>
              <p className="text-sm text-gray-500">
                {project.month} {project.year}
              </p>
              <p className="mt-2 text-sm">{project.projectDescription}</p>
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-sm mt-2 inline-block"
                >
                  View Project →
                </a>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Skills
        </h3>
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill.skill}
              </Badge>
            ))}
          </div>
        </Card>
      </section>

      {/* Achievements */}
      <section className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements
        </h3>
        <Card className="p-4">
          <ul className="list-disc list-inside space-y-2">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                {achievement.achievement}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <ul className="list-disc list-inside space-y-2">
            {resumeData.extraCurricular.map((activity, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300">
                {activity.activity}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}