import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.BAD_REQUEST;
    let error: any;
    if (typeof exception.getResponse !== 'undefined') {
      error = exception.getResponse();
    } else {
      error = exception;
    }

    response.status(status).json({
      statusCode: status,
      message: error.message ? error.message : error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
