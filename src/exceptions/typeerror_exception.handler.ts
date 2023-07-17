import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ImATeapotException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private httpAdaptorHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception.message.includes('wrong final block length')) {
      return response.render('error', {
        err_message: 'Why You Break it?Something bad will happen',
        error: `From Assistant: Did you just changed the cookie?`,
      });
    }
    if (exception.message.includes("I'm a teapot")) {
      return response.render('error', {
        err_message: 'Bro You need to SignUp or SignIn',
        error: `Possible Error: ${exception.message}`,
      });
    }
    console.log(exception);
    return response.render('error', {
      err_message: 'Why You Break it?Something bad will happen',
      error: `Possible Error: ${exception.message}`,
    });
  }
}
