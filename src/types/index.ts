export interface careerObjective {
    objective: string;
}
export interface Education {
    collegeName: string;
    degreeName: string;
    courseName: string;
    courseStartYear: string;
    courseEndYear: string;
    currentGPA: string;
}

export interface WorkExperience {
    jobTitle: string;
    companyName: string;
    jobStartYear: string;
    jobEndYear: string;
    jobDescription: string;
}

export interface Projects {
    projectName: string;
    projectDescription: string;
    projectLink: string;
    month: string;
    year: string;
}

export interface Skills {
    skill: string;
}

export interface ResumeData {
    careerObjective: string[];
    education: Education[];
    workExperience: WorkExperience[];
    projects: Projects[];
    achievements: string[];
    skills: string[];
}
