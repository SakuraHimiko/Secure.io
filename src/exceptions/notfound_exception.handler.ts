import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';

@Catch(NotFoundException)
export class NotFoundExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    response.render('404', {
      route: `The route ${request.originalUrl} not exist just like you don't have girlfriend`,
    });
  }
}
