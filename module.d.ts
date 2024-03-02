import { User } from '@prisma/client';

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
    REFRESH_TOKEN_KEY: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
