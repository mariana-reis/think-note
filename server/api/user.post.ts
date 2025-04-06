import prisma from '~/lib/prisma';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody<{ email: string; password: string }>(event);

    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: 'E-mail inválido. Por favor, insira um e-mail válido.',
      });
    }

    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message:  'A senha deve ter no mínimo 8 caracteres.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt,
      },
    });

    if (!process.env.JWT_SECRET) {
      throw createError({
        statusCode: 500,
        message: 'JWT secret is not defined.',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    setCookie(event, 'AppleNoteJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { data: 'success!' };
  } catch (error: any) {
    console.error(error);

    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'Já existe uma conta cadastrada com este e-mail.',
      });
    }

    throw error;
  }
});