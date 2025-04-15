import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("resume") as File;
  const jobId = formData.get("jobId");

  if (!file || !jobId) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ✅ Ensure /public/resumes exists
  const uploadDir = path.join(process.cwd(), "public", "resumes");
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // ✅ Create full file path
  const filePath = path.join(uploadDir, file.name);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ success: true, path: `/resumes/${file.name}` });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ message: "Failed to save file." }, { status: 500 });
  }
}
