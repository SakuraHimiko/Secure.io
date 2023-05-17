import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';

@Catch(BadRequestException)
export class BadRequestExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    response.send({
      failed_true: true,
      login_message: exception.message,
    });
  }
}
