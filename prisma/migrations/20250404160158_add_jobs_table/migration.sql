-- CreateTable
CREATE TABLE "Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "shortdescription" TEXT NOT NULL
);
