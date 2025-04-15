// app/api/check-application/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const jobId = url.searchParams.get("jobId");

  console.log("Checking if already applied for:", email, jobId);

  // Return dummy response — always says user has not applied
  return NextResponse.json({ applied: false });
}
