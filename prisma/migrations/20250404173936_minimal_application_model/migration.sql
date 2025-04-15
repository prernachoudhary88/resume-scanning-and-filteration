/*
  Warnings:

  - You are about to drop the column `email` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `Application` table. All the data in the column will be lost.
  - Added the required column `resume` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resume" BLOB NOT NULL,
    "jobId" INTEGER NOT NULL
);
INSERT INTO "new_Application" ("id", "jobId") SELECT "id", "jobId" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
