-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectTags" SET NOT NULL,
ALTER COLUMN "projectTags" SET DATA TYPE TEXT,
ALTER COLUMN "projectDescription" SET NOT NULL,
ALTER COLUMN "projectDescription" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DATA TYPE TEXT;
