import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ProblemDetailFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      type: `https://httpstatuses.com/${status}`,
      title: exception.name || 'Internal Server Error',
      status: status,
      detail: exception.response?.message || exception.message,
      instance: ctx.getRequest().url,
    };

    response.status(status).json(errorResponse);
  }
}