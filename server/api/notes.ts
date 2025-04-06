import prisma from '~/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const cookies = parseCookies(event);
    const token = cookies.AppleNoteJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access notes',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw createError({
        statusCode: 500,
        statusMessage: 'JWT secret is not defined',
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token',
      });
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: decodedToken.id,
      },
    });

    return notes;
  } catch (err) {
    console.error('Error fetching notes:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});