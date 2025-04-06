import prisma from '~/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Note ID is required',
      });
    }

    const cookies = parseCookies(event);
    const token = cookies.AppleNoteJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to delete',
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

    const noteTryingToDelete = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!noteTryingToDelete) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Note does not exist',
      });
    }

    if (noteTryingToDelete.userId !== decodedToken.id) {
      throw createError({
        statusCode: 403,
        statusMessage: 'No permission to delete this note',
      });
    }

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return { message: 'Nota excluída com sucesso' };
  } catch (err) {
    console.error('Error deleting note:', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});