import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user.email;
    const transfers = await prisma.file.findMany({
      where: {
        OR: [
          { senderEmail: userEmail },
          { receiverEmail: userEmail }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        size: true,
        mimeType: true,
        createdAt: true,
        senderEmail: true,
        receiverEmail: true,
        subject: true,
        message: true
      }
    });

    return NextResponse.json({ transfers });
  } catch (error) {
    console.error('Error fetching transfers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
