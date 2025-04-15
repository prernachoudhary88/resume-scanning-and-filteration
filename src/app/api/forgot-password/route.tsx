import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');

  // Save token in DB
  await prisma.passwordResetToken.create({
    data: {
      token,
      email,
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  // Send the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  return NextResponse.json({ message: 'Reset email sent' });
}
