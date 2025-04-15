-- CreateTable
CREATE TABLE "Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_jobId_key" ON "Application"("email", "jobId");
