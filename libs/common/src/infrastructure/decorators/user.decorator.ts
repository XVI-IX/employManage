import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthUser {
  id: string;
  email?: string;
  role?: string;
}

export const GetAuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    return req.user;
  },
);
