import jwt, { type VerifyOptions } from 'jsonwebtoken'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      verifyJwtToken: (token: string, secret: string, options?: VerifyOptions) => {
        try {
          return jwt.verify(token, secret, options);
        } catch (error) {
          console.error('Erro ao verificar JWT:', error);
          return null;
        }
      }
    }
  }
})