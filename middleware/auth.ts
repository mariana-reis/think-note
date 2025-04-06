import type { JwtPayload } from 'jsonwebtoken';

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) return;

  const { $verifyJwtToken } = useNuxtApp();

  const jwt = useCookie('AppleNoteJWT');

  if (!jwt.value || typeof jwt.value !== 'string') {
    return navigateTo('/register');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || typeof jwtSecret !== 'string') {
    throw new Error('JWT_SECRET is not defined or is not a string');
  }

  try {
    const decoded = $verifyJwtToken(jwt.value, jwtSecret) as JwtPayload;

    if (!decoded.id) {
      return navigateTo('/register');
    }

  } catch (error) {
    return navigateTo('/register');
  }
});