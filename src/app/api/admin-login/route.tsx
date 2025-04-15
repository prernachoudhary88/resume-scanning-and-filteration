import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return NextResponse.json({ message: "Admin not found" }, { status: 404 });
  }

  // 🚫 Skip bcrypt — just compare raw passwords
  if (admin.password !== password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
