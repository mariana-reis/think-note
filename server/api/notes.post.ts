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
        statusMessage: 'Not authorized to update',
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

    const newNote = await prisma.note.create({
      data: {
        text: '',
        userId: decodedToken.id,
      },
    });

    return newNote;
  } catch (err) {
    console.error('Error creating note:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not create note',
    });
  }
});